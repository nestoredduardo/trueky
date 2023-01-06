import { trpc } from "@/lib/trpc";

import { Dayjs } from "@/utils/Date";
import { BarterCard } from "./BarterCard";

export const MyMatch: React.FC = () => {
  const { data, isLoading } = trpc.match.getMyMatch.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-fit">
      {data?.data.map((like) => {
        return (
          <BarterCard
            key={like.id}
            user_image={like.product_two.user.image || "/images/user.png"}
            user_name={like.product_two.user.name}
            left_product_image={
              like.product_one.images[0] || "/images/product.png"
            }
            left_product_name={like.product_one.name}
            date={Dayjs.getInstance()
              .dayjs(like.updatedAt)
              .format("DD/MM/YYYY")}
            right_product_image={
              like.product_two.images[0] || "/images/product.png"
            }
            right_product_name={like.product_two.name}
            type="match"
          />
        );
      })}
    </div>
  );
};
