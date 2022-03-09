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
