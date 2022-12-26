import z from "zod";

export const createProductDTO = z.object({
  name: z.string({ required_error: "El nombre del producto es requerido" }),
  description: z.string({
    required_error: "La descripción del producto es requerida",
  }),
  images: z.array(
    z.string({ required_error: "Las imágenes del producto son requeridas" })
  ),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
