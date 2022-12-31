import { Layout, ProductCard } from "@/components";

// Utils
import { trpc } from "@/lib/trpc";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { Session } from "next-auth";

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

  const { data, isLoading } = trpc.products.myProducts.useQuery();

  return (
    <Layout user={user}>
      <h1 className="w-full text-left">Mis productos</h1>
      {isLoading ? <div>Loading...</div> : null}
      <div className="flex flex-wrap justify-center gap-4">
        {data?.data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Layout>
  );
};

export default MyProductsPage;
