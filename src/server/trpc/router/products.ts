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
});
