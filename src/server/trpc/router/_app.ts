import { router } from "../trpc";
import { authRouter } from "./auth";
import { productsRouter } from "./products";
import { matchRouter } from "./match";

export const appRouter = router({
  products: productsRouter,
  auth: authRouter,
  match: matchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
