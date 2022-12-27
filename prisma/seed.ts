import { PrismaClient } from "@prisma/client";

import {
  addCategory,
  addProduct,
  addOrderStatus,
  addOrderDetailStatus,
} from "./seeds";

const prisma = new PrismaClient();

async function main() {
  await addCategory();
  await addProduct();
  await addOrderStatus();
  await addOrderDetailStatus();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
