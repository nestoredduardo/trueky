import { useState } from "react";

// Components
import { Layout } from "@/components";
import {
  TabControl,
  MyLikes,
  LikesReceived,
  MyMatch,
} from "@/modules/match/components";

// Utils
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

// Types
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import type { Session } from "next-auth";
import type { TabType } from "@/modules/match";

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

  const [tab, setTab] = useState<keyof typeof TabType>("liked");

  return (
    <Layout user={user} containerSize="sm">
      <h1 className="w-full text-left">Mis trueques</h1>

      <TabControl tab={tab} setTab={setTab} />

      {tab === "liked" ? <MyLikes /> : null}
      {tab === "received" ? <LikesReceived /> : null}
      {tab === "match" ? <MyMatch /> : null}
    </Layout>
  );
};

export default MyMatchPage;
