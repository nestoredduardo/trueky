import { signIn } from "next-auth/react";
import { Text, Paper, Group, Button } from "@mantine/core";
import type { PaperProps } from "@mantine/core";
import { GoogleIcon } from "@/modules/auth/GoogleIcon";
import type { NextPage } from "next";

const AuthenticationForm: NextPage = (props: PaperProps) => {
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
            onClick={() => signIn("google")}
          />
        </Group>
      </Paper>
    </main>
  );
};

export default AuthenticationForm;
