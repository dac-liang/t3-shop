import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const createCategories: Prisma.CategoryUncheckedCreateInput[] = [
  {
    id: 1,
    name: "プロテイン",
  },
  {
    id: 2,
    name: "サプリ",
  },
  {
    id: 3,
    name: "おやつ",
  },
];

const addCategory = async () => {
  const prisma = new PrismaClient();
  const preparedData: ReturnType<typeof prisma.category.create>[] = [];
  for (const row of createCategories) {
    const prismaData = prisma.category.create({
      data: row,
    });
    preparedData.push(prismaData);
  }
  return await prisma.$transaction(preparedData);
};

export { addCategory };
