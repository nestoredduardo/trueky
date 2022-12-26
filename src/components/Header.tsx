import {
  createStyles,
  Header as HeaderMantine,
  Group,
  Burger,
  Container,
  Transition,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsArrowLeftRight } from "react-icons/bs";

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { children } = props;

  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <HeaderMantine height={HEADER_HEIGHT} mb={120}>
      <Container>
        <div className={classes.inner}>
          <div className="flex items-center gap-2">
            <BsArrowLeftRight className="h-6 w-6 text-orange-400" />
            <h1 className="font-bold text-orange-400">Trueky</h1>
          </div>
          <Group className={classes.links}>{children}</Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
        </div>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {children}
            </Paper>
          )}
        </Transition>
      </Container>
    </HeaderMantine>
  );
};
