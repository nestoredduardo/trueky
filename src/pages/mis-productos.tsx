import { useState } from "react";

import { Layout, ProductCard } from "@/components";
import { Button } from "@mantine/core";
import { DeleteProductModal } from "@/modules/myProducts/DeleteProductModal";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import useUserProducts from "@/hooks/useUserProducts";

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { Session } from "next-auth";
import type { Product } from "@prisma/client";

interface MyProductsPageProps {
  user: Session["user"];
}

export const getServerSideProps: GetServerSideProps<
  MyProductsPageProps
> = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/ingresar",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

const MyProductsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { user } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const { data, isLoading } = useUserProducts();

  return (
    <>
      <Layout user={user}>
        <h1 className="w-full text-left">Mis productos</h1>
        {isLoading ? <div>Loading...</div> : null}
        <div className="flex flex-wrap justify-center gap-4">
          {data?.data.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              callToAction={
                <div className="flex w-full gap-4">
                  <Button
                    fullWidth
                    variant="subtle"
                    color="red"
                    onClick={() => {
                      setProduct(product);
                      setDeleteOpen(true);
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button fullWidth variant="outline">
                    Editar
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      </Layout>

      <DeleteProductModal
        productId={product?.id}
        isOpen={deleteOpen}
        setIsOpen={setDeleteOpen}
      />
    </>
  );
};

export default MyProductsPage;
