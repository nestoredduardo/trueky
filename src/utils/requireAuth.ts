// Types
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

export const requireAuth = (getServerSideProps: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/ingresar",
          permanent: false,
        },
      };
    }

    return getServerSideProps(ctx);
  };
};
