import z from "zod";

export const createProductDTO = z.object({
  name: z
    .string({ required_error: "El nombre del producto es requerido" })
    .min(3, "El nombre del producto debe tener al menos 3 caracteres"),
  description: z
    .string({
      required_error: "La descripción del producto es requerida",
    })
    .min(10, "La descripción del producto debe tener al menos 10 caracteres"),
  images: z.array(
    z.string({ required_error: "Las imágenes del producto son requeridas" })
  ),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
