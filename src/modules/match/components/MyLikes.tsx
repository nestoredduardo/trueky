import { trpc } from "@/lib/trpc";
import Image from "next/image";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";

import { Dayjs } from "@/utils/Date";

export const MyLikes: React.FC = () => {
  const { data, isLoading } = trpc.match.getMyLikes.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-fit">
      {data?.data.map((like) => {
        return (
          <div key={like.id} className="mt-4 w-full divide-y sm:w-96">
            <div className="flex items-center gap-2">
              <Image
                src={like.product_two.user.image || "/images/user.png"}
                alt={like.product_two.user.name}
                width={250}
                height={250}
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="text-lg font-medium">
                {like.product_two.user.name.split(" ")[0]}{" "}
              </p>
              <p className="ml-auto text-gray-500">
                {Dayjs.getInstance().dayjs(like.updatedAt).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-lg font-medium">Ofreces</p>
                <Image
                  src={like.product_one.images[0] || "/images/product.png"}
                  alt={like.product_one.name}
                  width={250}
                  height={250}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <p className="mt-2 text-gray-500"> {like.product_one.name}</p>
              </div>
              <div className="flex flex-col">
                <CgArrowLongRight className="text-4xl text-green-500" />
                <CgArrowLongLeft className="text-4xl text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium">Recibes</p>
                <Image
                  src={like.product_two.images[0] || "/images/product.png"}
                  alt={like.product_two.name}
                  width={250}
                  height={250}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <p className="mt-2 text-gray-500"> {like.product_two.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
