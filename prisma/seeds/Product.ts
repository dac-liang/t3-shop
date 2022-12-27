import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const createProduct: Prisma.ProductUncheckedCreateInput[] = [
  {
    name: "ホエイプロテイン",
    productDetail: {
      create: [
        {
          price: 3000,
          volume: 250,
          unit: "g",
        },
        {
          price: 5800,
          volume: 500,
          unit: "g",
        },
      ],
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoryId: 1,
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
    categoryId: 1,
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
    categoryId: 1,
  },
  {
    name: "コラーゲングミ",
    productDetail: {
      create: {
        price: 500,
        volume: 100,
        unit: "粒",
      },
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoryId: 3,
  },
  {
    name: "プロテインバー(バナナ)",
    productDetail: {
      create: [
        {
          price: 150,
          volume: 1,
          unit: "本",
        },
        {
          price: 1600,
          volume: 12,
          unit: "本",
        },
      ],
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoryId: 3,
  },
  {
    name: "プロテインバー(チョコレート)",
    productDetail: {
      create: [
        {
          price: 150,
          volume: 1,
          unit: "本",
        },
        {
          price: 1600,
          volume: 12,
          unit: "本",
        },
      ],
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoryId: 3,
  },
  {
    name: "プロテインバー(抹茶)",
    productDetail: {
      create: [
        {
          price: 150,
          volume: 1,
          unit: "本",
        },
        {
          price: 1600,
          volume: 12,
          unit: "本",
        },
      ],
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoryId: 3,
  },
  {
    name: "プロテインバー(バニラ)",
    productDetail: {
      create: [
        {
          price: 150,
          volume: 1,
          unit: "本",
        },
        {
          price: 1600,
          volume: 12,
          unit: "本",
        },
      ],
    },
    productImage: {
      create: {
        url: "/images/420x260.png",
      },
    },
    categoryId: 3,
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
