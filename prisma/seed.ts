import { PrismaClient } from "@prisma/client";

import { addCategory, addProduct } from "./seeds";

const prisma = new PrismaClient();

async function main() {
  await addCategory();
  await addProduct();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
