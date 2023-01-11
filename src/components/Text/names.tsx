import classNames from "classnames";
import type { TextProps } from "./Text";

export const H1: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return (
    <h1 className={classNames(className, "my-0 text-2xl font-bold")}>
      {children}
    </h1>
  );
};

export const Subtitle: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return (
    <p className={classNames(className, "my-0 text-sm text-gray-500")}>
      {children}
    </p>
  );
};
