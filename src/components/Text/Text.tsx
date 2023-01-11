import React, { PropsWithoutRef, RefAttributes } from "react";
import classNames from "classnames";

import {
  H1 as H1Component,
  Subtitle as SubtitleComponent,
} from "@/shared/components/Text/names";

export interface TextProps {
  children: React.ReactNode;

  className?: string;
}

const Text = React.forwardRef<HTMLHeadingElement, TextProps>((props, ref) => {
  const { children, className } = props;

  return <p className={classNames(className, "text-black")}>{children}</p>;
});

Text.displayName = "Text";

type TextComponent<
  T,
  P = Record<string, unknown>,
> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> & {
  H1: typeof H1Component;
  Subtitle: typeof SubtitleComponent;
};

export default Text as TextComponent<HTMLParagraphElement, TextProps>;
