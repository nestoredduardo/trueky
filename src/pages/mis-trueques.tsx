import { Layout, ProductCard } from "@/components";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

// Services
import { trpc } from "@/lib/trpc";

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { Session } from "next-auth";

interface MyMatchPageProps {
  user: Session["user"];
}

export const getServerSideProps: GetServerSideProps<MyMatchPageProps> = async (
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

const MyMatchPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { user } = props;

  const { data, isLoading } = trpc.match.getMyMatch.useQuery();

  return (
    <Layout user={user}>
      <h1 className="w-full text-left">Mis trueques</h1>
      {isLoading ? <div>Loading...</div> : null}
      <div className="flex flex-wrap justify-center gap-4">
        {data?.data.map((match) => (
          <div key={match.id}></div>
        ))}
      </div>
    </Layout>
  );
};

export default MyMatchPage;
