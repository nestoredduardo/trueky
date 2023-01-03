import { useState } from "react";
import { Button } from "@mantine/core";
import toast from "react-hot-toast";
import Image from "next/image";
import classNames from "classnames";

// Components
import { Layout, ProductCard, Modal } from "@/components";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { trpc } from "@/lib/trpc";
import useUserProducts from "@/hooks/useUserProducts";

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { Session } from "next-auth";
import type { Product } from "@prisma/client";

interface HomeProps {
  user: Session["user"];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
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

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { user } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [proposedProductId, setProposedProductId] = useState<string | null>(
    null
  );

  const { data: userProducts, isLoading: loadingProducts } = useUserProducts();

  const { data, isLoading } = trpc.products.privateInfinite.useInfiniteQuery(
    {
      limit: 50,
    },
    {
      getNextPageParam: (lastPage) => lastPage.data.nextCursor,
    }
  );

  const doMatchMutation = trpc.match.create.useMutation({
    onSuccess: () => {
      setModalOpen(false);
      toast.success("Se ha enviado tu solicitud");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Layout user={user}>
        {isLoading ? <div>Loading...</div> : null}
        <div className="flex flex-wrap justify-center gap-4">
          {data?.pages.map((page) => (
            <>
              {page.data.products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  callToAction={
                    <Button
                      color="blue"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setModalOpen(true);
                        setSelectedProduct(product);
                      }}
                    >
                      Me interesa
                    </Button>
                  }
                />
              ))}
            </>
          ))}
        </div>
      </Layout>

      <Modal
        showModal={modalOpen && selectedProduct !== null}
        setShowModal={setModalOpen}
        disableClose={doMatchMutation.isLoading}
      >
        <div className="flex flex-col gap-4 rounded-lg bg-white px-4 py-6">
          <h1 className="text-2xl font-bold">
            ¿Estás interesado en {selectedProduct?.name}?
          </h1>

          <div className="flex gap-2">
            <Image
              src={selectedProduct?.images[0] || "/no-image.png"}
              alt={selectedProduct?.name || "No image"}
              width={250}
              height={250}
              className="h-24 w-24 rounded-lg object-cover"
            />
            <p className="m-0 max-h-24 truncate text-gray-500">
              {selectedProduct?.description}
            </p>
          </div>

          <p className="text-gray-500">
            Elije qué productos de tu lista de productos te gustaría
            intercambiar
          </p>
          <section className="flex flex-wrap gap-4">
            {loadingProducts ? <div>Loading...</div> : null}
            {userProducts?.data.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setProposedProductId(product.id);
                }}
                className={classNames(
                  proposedProductId === product.id
                    ? "ring-2 ring-yellow-500 ring-offset-2 ring-offset-white"
                    : "",
                  "relative h-24 w-24 cursor-pointer overflow-hidden rounded-lg border-0 p-0 transition-all duration-300 hover:scale-105 active:scale-[0.99]"
                )}
              >
                <Image
                  src={product.images[0] || "/no-image.png"}
                  alt={product.name}
                  width={250}
                  height={250}
                  className="h-24 w-24 rounded-lg  object-cover"
                />
              </button>
            ))}
          </section>

          <p>
            Has seleccionado{" "}
            <strong>
              {
                userProducts?.data.find(
                  (product) => product.id === proposedProductId
                )?.name
              }
            </strong>
          </p>

          <Button
            color="blue"
            variant="outline"
            size="sm"
            disabled={
              proposedProductId === null || proposedProductId === undefined
            }
            loading={doMatchMutation.isLoading}
            onClick={async () => {
              try {
                if (proposedProductId && selectedProduct?.id)
                  await doMatchMutation.mutateAsync({
                    proposed_product_id: proposedProductId,
                    requested_product_id: selectedProduct?.id,
                  });
              } catch (error) {}
            }}
          >
            Enviar solicitud
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
