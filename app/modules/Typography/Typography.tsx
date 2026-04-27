import cx from "classnames";
import React from "react";

import styles from "./Typography.module.scss";

type Variant = "h1" | "h2" | "h3" | "body" | "caption";
type Weight = "regular" | "black";

type BaseProps = {
  variant?: Variant;
  weight?: Weight;
  align?: "left" | "center" | "right";
  truncate?: boolean;
  className?: string;
};

type PolymorphicProps<E extends React.ElementType> =
  BaseProps &
  { as?: E } &
  Omit<React.ComponentPropsWithoutRef<E>, keyof BaseProps | "as">;

type TypographyComponent = <E extends React.ElementType = "p">(
  props: PolymorphicProps<E> & {
    ref?: React.ComponentPropsWithRef<E>["ref"];
  }
) => React.ReactElement | null;

const variantStyles = {
  caption: "text-sm text-gray-500",
} as const;

const weightStyles = {
  regular: "font-[400]",
  black: "font-[900]",
} as const;

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const TypographyBase = (
  props: BaseProps & { as?: React.ElementType } & Record<string, any>,
  ref: React.ForwardedRef<any>
) => {
  const {
    as,
    variant = "body",
    weight = "regular",
    align = "left",
    truncate = false,
    className,
    children,
    ...rest
  } = props;

  const Component = as || (variant.startsWith("h") ? variant : "p");

  return (
    <Component
      ref={ref}
      className={cx(
        "font-sans",
        weightStyles[weight],
        alignStyles[align],
        truncate && "truncate",
        styles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const Typography = React.forwardRef(TypographyBase) as TypographyComponent;