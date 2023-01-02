import z from "zod";

export const createMatchDTO = z.object({
  proposed_product_id: z.string().min(1),
  requested_product_id: z.string().min(1),
});
