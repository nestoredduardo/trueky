import { trpc } from "@/lib/trpc";

const useUserProducts = () => {
  const { data, isLoading } = trpc.products.myProducts.useQuery();

  return {
    data,
    isLoading,
  };
};

export default useUserProducts;
