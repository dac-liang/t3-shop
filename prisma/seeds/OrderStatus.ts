import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const createOrderStatus: Prisma.OrderStatusUncheckedCreateInput[] = [
  {
    sequence: 1,
    id: "ORDERED",
    name: "注文受付",
  },
  {
    sequence: 2,
    id: "ACCEPETED",
    name: "注文確定",
  },
  {
    sequence: 3,
    id: "REJECTED",
    name: "注文不可",
  },
  {
    sequence: 4,
    id: "CANCELED",
    name: "注文取り消し",
  },
  {
    sequence: 5,
    id: "RETURNED",
    name: "返品",
  },
];

const addOrderStatus = async () => {
  const prisma = new PrismaClient();
  const preparedData: ReturnType<typeof prisma.orderStatus.create>[] = [];
  for (const row of createOrderStatus) {
    const prismaData = prisma.orderStatus.create({
      data: row,
    });
    preparedData.push(prismaData);
  }
  return await prisma.$transaction(preparedData);
};

export { addOrderStatus };
