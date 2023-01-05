import { createStyles, SegmentedControl } from "@mantine/core";

import type { TabType } from "@/modules/match";
import { tabData } from "@/modules/match";

export interface TabControlProps {
  tab: keyof typeof TabType;
  setTab: (tab: keyof typeof TabType) => void;
}

export const TabControl: React.FC<TabControlProps> = (props) => {
  const { tab, setTab } = props;

  const useStyles = createStyles((theme) => ({
    root: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      boxShadow: theme.shadows.md,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1]
      }`,
    },

    active: {
      backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
    },

    control: {
      border: "0 !important",
    },

    labelActive: {
      color: `${theme.white} !important`,
    },
  }));

  const { classes } = useStyles();

  return (
    <SegmentedControl
      radius="xl"
      size="md"
      value={tab}
      onChange={(value) => setTab(value as keyof typeof TabType)}
      data={tabData}
      classNames={classes}
    />
  );
};
