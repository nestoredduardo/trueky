import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";

// Components
import { Header, UserInfo } from "@/components";
import { NewProduct } from "@/modules/home/components";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { prisma } from "@/server/db/client";

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
  userProducts: Array<Product>;
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

  const userProducts = await prisma.product.findMany({
    where: {
      user_id: session.user.id,
    },
  });

  return {
    props: {
      user: session.user,
      userProducts: userProducts,
    },
  };
};

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { user, userProducts } = props;

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

      <main className="flex flex-col items-center justify-center">
        {userProducts.length === 0 ? <NewProduct /> : null}
      </main>
    </>
  );
};

export default Home;
