import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        productDetail: true,
        productImage: {
          select: {
            url: true,
          },
        },
        category: true,
      },
    });
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: Number(input.id),
        },
        include: {
          category: true,
          productImage: {
            select: {
              url: true,
            },
          },
          productDetail: {
            select: {
              id: true,
              price: true,
              volume: true,
              unit: true,
            },
          },
        },
      });
    }),
});
