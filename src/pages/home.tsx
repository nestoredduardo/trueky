import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";

// Components
import { Header, UserInfo } from "@/components";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

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

  return (
    <>
      <Header>
        <UserInfo image={user.image} name={user.name} email={user.email} />
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Cerrar sesión
        </Button>
      </Header>
    </>
  );
};

export default Home;
