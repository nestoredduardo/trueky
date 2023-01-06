import { TRPCError } from "@trpc/server";

import { router, protectedProcedure } from "../trpc";

import { createMatchDTO } from "@/server/trpc/validations/match";
import sendMail from "@/emails";
import BasicEmail from "@/emails/Basic";

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
        // Validate if user one or two already liked the product
        if (
          existingMatch.product_one_id === input.proposed_product_id &&
          existingMatch.product_one_like
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Ya le diste like a este producto",
          });
        }

        if (
          existingMatch.product_two_id === input.proposed_product_id &&
          existingMatch.product_two_like
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Ya le diste like a este producto",
          });
        }

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
  getMyLikes: protectedProcedure.query(async ({ ctx }) => {
    const myLikes = await ctx.prisma.match.findMany({
      where: {
        product_one: {
          user_id: ctx.session.user.id,
        },
      },
      select: {
        id: true,
        product_one_id: true,
        product_two_id: true,
        product_one_like: true,
        product_two_like: true,
        match: true,
        updatedAt: true,
        product_one: {
          select: {
            id: true,
            name: true,
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        product_two: {
          select: {
            id: true,
            name: true,
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!myLikes)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo obtener tus likes",
      });

    return {
      status: 200,
      message: "Likes obtenidos con éxito",
      data: myLikes,
    };
  }),
  getLikesReceived: protectedProcedure.query(async ({ ctx }) => {
    const likesReceived = await ctx.prisma.match.findMany({
      where: {
        product_two: {
          user_id: ctx.session.user.id,
        },
        match: false,
      },
      select: {
        id: true,
        product_one_id: true,
        product_two_id: true,
        product_one_like: true,
        product_two_like: true,
        match: true,
        updatedAt: true,
        product_one: {
          select: {
            id: true,
            name: true,
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        product_two: {
          select: {
            id: true,
            name: true,
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!likesReceived)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No se pudo obtener tus likes",
      });

    return {
      status: 200,
      message: "Likes obtenidos con éxito",
      data: likesReceived,
    };
  }),
  getMyMatch: protectedProcedure.query(async ({ ctx }) => {
    const match = await ctx.prisma.match.findMany({
      where: {
        OR: [
          {
            product_one: {
              user_id: ctx.session.user.id,
            },
          },
          {
            product_two: {
              user_id: ctx.session.user.id,
            },
          },
        ],
        match: true,
      },
      select: {
        id: true,
        product_one_id: true,
        product_two_id: true,
        product_one_like: true,
        product_two_like: true,
        match: true,
        updatedAt: true,
        product_one: {
          select: {
            id: true,
            name: true,
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        product_two: {
          select: {
            id: true,
            name: true,
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return {
      status: 200,
      message: "Match obtenido con éxito",
      data: match,
    };
  }),
});
