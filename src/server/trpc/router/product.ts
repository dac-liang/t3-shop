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
        categoriesOnProducts: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: input.id,
        },
        include: {
          categoriesOnProducts: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          productImage: {
            select: {
              url: true,
            },
          },
        },
      });
    }),
  // addProduct: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.product.upsert({
  //     where: { id: "1" },
  //     create: { id: "1", name: "test" },
  //     update: { id: "1", name: "test-update" },
  //   });
  // }),
});
