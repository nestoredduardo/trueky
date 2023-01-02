import { Button } from "@mantine/core";
import toast from "react-hot-toast";

// Components
import { Layout, ProductCard } from "@/components";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { trpc } from "@/lib/trpc";

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { Session } from "next-auth";

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
      toast.success("Se ha enviado tu solicitud");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
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
                      console.log("Clicked");
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
  );
};

export default Home;
