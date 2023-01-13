import Image from "next/image";
import classNames from "classnames";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";

import type { TabType } from "@/modules/match";

export interface BarterCardProps {
  user_name: string;
  user_image: string;
  left_product_image: string;
  left_product_name: string;
  date: string;
  right_product_image: string;
  right_product_name: string;
  type: keyof typeof TabType;
  actions?: React.ReactNode;
}

export const BarterCard: React.FC<BarterCardProps> = (props) => {
  const {
    user_name,
    user_image,
    left_product_image,
    left_product_name,
    date,
    right_product_image,
    right_product_name,
    type,
    actions,
  } = props;

  return (
    <div className="mt-4 w-full sm:w-96">
      <div className="flex items-center gap-2">
        <Image
          src={user_image}
          alt={user_name}
          width={250}
          height={250}
          className="h-12 w-12 rounded-full object-cover"
        />
        <p className="text-lg font-medium">{user_name}</p>
        <p className="ml-auto text-gray-500">{date}</p>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div>
          <p className="text-lg font-medium">Ofreces</p>
          <Image
            src={left_product_image}
            alt={left_product_name}
            width={250}
            height={250}
            className="h-24 w-24 rounded-lg object-cover"
          />
          <p className="mt-2 text-gray-500"> {left_product_name}</p>
        </div>
        <div className="flex flex-col">
          <CgArrowLongRight
            className={classNames(
              type === "received" ? "text-gray-400" : "text-green-500",
              "text-4xl"
            )}
          />
          <CgArrowLongLeft
            className={classNames(
              type === "liked" ? "text-gray-400" : "text-green-500",
              "text-4xl"
            )}
          />
        </div>
        <div>
          <p className="text-lg font-medium">Recibes</p>
          <Image
            src={right_product_image}
            alt={right_product_name}
            width={250}
            height={250}
            className="h-24 w-24 rounded-lg object-cover"
          />
          <p className="mt-2 text-gray-500">{right_product_name}</p>
        </div>
      </div>
      {actions}
    </div>
  );
};
