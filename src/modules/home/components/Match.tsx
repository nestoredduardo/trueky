import { trpc } from "@/lib/trpc";

import { ProductCard } from "./ProductCard";

export const Match: React.FC = () => {
  const { data, isLoading } = trpc.products.privateInfinite.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {data?.pages.map((page) => (
        <>
          {page.data.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </>
      ))}
    </div>
  );
};
