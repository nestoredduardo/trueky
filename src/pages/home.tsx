import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";

// Components
import { Header, UserInfo, NonSSRWrapper } from "@/components";
import { NewProduct, Match } from "@/modules/home/components";

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
  userProducts: Array<Omit<Product, "createdAt" | "updatedAt" | "user_id">>;
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
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
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
        <div className="mb-4 flex flex-col items-center gap-2 sm:mb-0 sm:flex-row">
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
        </div>
      </Header>

      <main className="flex flex-col items-center justify-center px-4">
        {userProducts.length === 0 ? (
          <NewProduct />
        ) : (
          <NonSSRWrapper>
            <Match />
          </NonSSRWrapper>
        )}
      </main>
    </>
  );
};

export default Home;
