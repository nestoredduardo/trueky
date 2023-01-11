import { trpc } from "@/lib/trpc";

const useUserProducts = () => {
  const { data, isLoading, refetch } = trpc.products.myProducts.useQuery();

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useUserProducts;
