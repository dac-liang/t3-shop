import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "一般会員";
  }),
  createOrder: protectedProcedure
    .input(
      z.object({
        cartSum: z.number(),
        shippingFee: z.number(),
        cartItems: z
          .object({
            id: z.number(),
            quantity: z.number(),
            price: z.number(),
            name: z.string(),
            category: z.object({
              id: z.number(),
              name: z.string(),
            }),
            productImage: z
              .object({
                url: z.string(),
              })
              .array(),
          })
          .array(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (input && input.cartItems && input.cartItems.length > 0) {
        const details = input.cartItems.map((item) => {
          return {
            statusId: "ORDERED",
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            productDetailId: item.id,
          };
        });

        return ctx.prisma.order.create({
          data: {
            total: input.cartSum + input.shippingFee,
            statusId: "ORDERED",
            userId: ctx.session.user.id,
            OrderDetail: {
              create: details,
            },
          },
        });
      }
    }),
});
