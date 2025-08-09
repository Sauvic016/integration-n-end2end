import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([prisma.request.deleteMany()]);
};
