import { TRPCError } from "@trpc/server";

import { router, protectedProcedure } from "../trpc";

import { createMatchDTO } from "@/server/trpc/validations/match";
import sendMail from "@/emails";
import BasicEmail from "@/emails/Basic";

// https://github.com/Deep-Codes/framer-tinder-cards/blob/main/package.json
export const matchRouter = router({
  create: protectedProcedure
    .input(createMatchDTO)
    .mutation(async ({ ctx, input }) => {
      const existingMatch = await ctx.prisma.match.findFirst({
        where: {
          OR: [
            {
              product_one_id: input.proposed_product_id,
              product_two_id: input.requested_product_id,
            },
            {
              product_one_id: input.requested_product_id,
              product_two_id: input.proposed_product_id,
            },
          ],
        },
      });

      if (existingMatch) {
        const match = await ctx.prisma.match.update({
          where: {
            id: existingMatch.id,
          },
          data: {
            product_one_like: true,
            product_two_like: true,
            match: true,
          },
          select: {
            id: true,
            product_one_id: true,
            product_two_id: true,
            product_one: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
            product_two: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        });

        if (!match)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No se pudo crear la propuesta",
          });

        await sendMail({
          subject: "Match",
          to: "nmamanipantoja@gmail.com",
          component: (
            <BasicEmail
              person_1={match.product_one.user.name}
              person_2={match.product_two.user.name}
              person_1_email={match.product_one.user.email}
              person_2_email={match.product_two.user.email}
              product_1_name={match.product_one.name}
              product_2_name={match.product_two.name}
            />
          ),
        });

        return {
          status: 201,
          message: "Match creado con éxito",
          data: match,
        };
      } else {
        const match = await ctx.prisma.match.create({
          data: {
            product_one_id: input.proposed_product_id,
            product_two_id: input.requested_product_id,
            product_one_like: true,
            product_two_like: false,
            match: false,
          },
        });

        if (!match)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No se pudo crear la propuesta",
          });

        return {
          status: 201,
          message: "Propuesta creada con éxito",
          data: match,
        };
      }
    }),
});
