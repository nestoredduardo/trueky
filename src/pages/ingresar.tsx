import { signIn } from "next-auth/react";
import { Text, Paper, Group, Button } from "@mantine/core";
import type { PaperProps } from "@mantine/core";
import { GoogleIcon } from "@/modules/auth/GoogleIcon";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import mixpanel from "@/lib/mixpanel";

const AuthenticationForm: NextPage = (props: PaperProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  if (session) {
    mixpanel.identify(session.user.id);
    mixpanel.people.set_once({
      $email: session.user.email,
      $name: session.user.name,
    });
    router.push("/explorar");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <Paper className="max-w-sm" radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Ingresa a Trueky con tu cuenta de Google
        </Text>

        <Group grow mb="md" mt="md">
          <Button
            leftIcon={<GoogleIcon className="h-6 w-6" />}
            variant="default"
            color="gray"
            radius="xl"
            size="lg"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/explorar",
              })
            }
          />
        </Group>
      </Paper>
    </main>
  );
};

export default AuthenticationForm;
