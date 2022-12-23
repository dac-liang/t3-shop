import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const createProduct: Prisma.ProductUncheckedCreateInput[] = [
  {
    name: "ホエイプロテイン",
    productDetail: {
      create: {
        price: 3000,
        volume: 250,
        unit: "g",
      },
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoriesOnProducts: {
      create: {
        categoryId: 1,
      },
    },
  },
  {
    name: "ソイプロテイン",
    productDetail: {
      create: {
        price: 3000,
        volume: 100,
        unit: "g",
      },
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoriesOnProducts: {
      create: {
        categoryId: 1,
      },
    },
  },
  {
    name: "ダイエットプロテイン",
    productDetail: {
      create: {
        price: 3000,
        volume: 100,
        unit: "g",
      },
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoriesOnProducts: {
      create: {
        categoryId: 1,
      },
    },
  },
];

const addProduct = async () => {
  const prisma = new PrismaClient();
  const preparedData: ReturnType<typeof prisma.product.create>[] = [];
  for (const row of createProduct) {
    const prismaData = prisma.product.create({
      data: row,
    });
    preparedData.push(prismaData);
  }
  return await prisma.$transaction(preparedData);
};

export { addProduct };
