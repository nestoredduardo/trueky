import { trpc } from "@/lib/trpc";
import toast from "react-hot-toast";

import { Dayjs } from "@/utils/Date";
import { BarterCard } from "./BarterCard";
import { Button } from "@mantine/core";

export const LikesReceived: React.FC = () => {
  const { data, isLoading, refetch } = trpc.match.getLikesReceived.useQuery();

  const acceptMatchMutation = trpc.match.acceptMatch.useMutation({
    onSuccess: (data) => {
      refetch();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
            type="received"
            actions={
              <div className="mx-4 rounded-lg bg-gray-50 p-4">
                <p className="m-0 mb-2">
                  ¿Aceptas <b>{like.product_two.name}</b> a cambio de{" "}
                  <b>{like.product_one.name}</b>?
                </p>
                <Button
                  onClick={() =>
                    acceptMatchMutation.mutate({
                      match_id: like.id,
                    })
                  }
                  loading={acceptMatchMutation.isLoading}
                >
                  Aceptar
                </Button>
              </div>
            }
          />
        );
      })}
    </div>
  );
};
