import { Group, Avatar, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
}));

interface UserButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export const UserInfo = ({ image, name, email }: UserButtonProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.user}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </div>
  );
};
