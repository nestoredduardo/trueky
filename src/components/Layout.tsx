import { signOut } from "next-auth/react";
import { Button, Container } from "@mantine/core";
import { useRouter } from "next/router";

// Components
import { Header, UserInfo } from "@/components";

import type { Session } from "next-auth";

export interface LayoutProps {
  user: Session["user"];
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children, user } = props;

  const router = useRouter();

  return (
    <>
      <Header>
        <div className="mb-4 flex flex-col items-center gap-2 sm:mb-0 sm:flex-row">
          <Button variant="subtle" onClick={() => router.push("/home")}>
            Descubre
          </Button>
          <Button
            variant="subtle"
            onClick={() => router.push("/mis-productos")}
          >
            Mis productos
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={() => router.push("/nuevo-producto")}
          >
            Nuevo producto{" "}
          </Button>
          <UserInfo image={user.image} name={user.name} email={user.email} />
          <Button
            variant="default"
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

      <Container size={"lg"}>{children}</Container>
    </>
  );
};
