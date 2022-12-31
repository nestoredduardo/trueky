import Image from "next/image";
import { createStyles, Card, Text, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}));

export interface ProductCardProps {
  images: string[];
  name: string;
  description: string;
  callToAction?: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { images, name, description, callToAction } = props;

  const { classes } = useStyles();

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image
        src={image}
        alt={name}
        height={220}
        width={320}
        className="object-cover"
      />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder p="xl" className="max-w-xs">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group position="apart" mt="lg">
        <Text weight={500} size="lg">
          {name}
        </Text>
      </Group>

      <Text size="sm" color="dimmed" mt="sm">
        {description}
      </Text>

      <Group position="apart" mt="md">
        {callToAction}
      </Group>
    </Card>
  );
};
