import z from "zod";
import { TRPCError } from "@trpc/server";

import { router, protectedProcedure } from "../trpc";

import { createProductDTO } from "@/server/trpc/validations/products";

export const productsRouter = router({
  create: protectedProcedure
    .input(createProductDTO)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          images: input.images,
          user_id: ctx.session.user.id,
        },
      });

      if (!product)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo crear el producto",
        });

      return {
        status: 201,
        message: "Producto creado con éxito",
        data: product,
      };
    }),
  privateInfinite: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;

      const products = await ctx.prisma.product.findMany({
        take: limit + 1,
        where: {
          NOT: {
            user_id: ctx.session.user.id,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: "asc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = nextItem?.id;
      }

      return {
        status: 200,
        message: "Productos obtenidos con éxito",
        data: {
          products,
          nextCursor,
        },
      };
    }),
});
