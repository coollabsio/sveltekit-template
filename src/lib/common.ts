import { dev } from '$app/env';
import * as Prisma from '@prisma/client';
import { default as ProdPrisma } from '@prisma/client';

let { PrismaClient } = Prisma;
let P = Prisma.Prisma;
if (!dev) {
	PrismaClient = ProdPrisma.PrismaClient;
	P = ProdPrisma.Prisma;
}

export const prisma = new PrismaClient({
	errorFormat: 'pretty',
	rejectOnNotFound: false
});

// Error example { status: 400, message: 'Invalid validation key.' }
export function errorHandlerEndpoints(error, isPublic = false) {
	if (!error.status) {
		error.status = 500;
	}
	const headers = {}
	if (isPublic) {
		headers['Access-Control-Allow-Origin'] = '*';
	}
	return {
		status: error.status,
		headers,
		body: {
			message: error.message,
			...error
		}
	}
}
