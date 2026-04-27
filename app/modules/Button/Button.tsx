'use client';

import cx from 'classnames';
import React from 'react';
import { Typography } from '../Typography/Typography';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'square';

type Props<E extends React.ElementType> = {
  as?: E;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;

  /** тільки для primary */
  color?: 'dark' | 'pink' | 'lime' | string;

  /** для secondary */
  borderColor?: 'dark' | 'white' | string;

  disabled?: boolean;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className'>;

type ButtonComponent = <E extends React.ElementType = 'button'>(
  props: Props<E> & { ref?: React.ComponentPropsWithRef<E>['ref'] }
) => React.ReactElement | null;

const colorMap = {
  dark: '#1E2330',
  pink: '#E9C0E9',
  lime: '#D2E823',
};

const ButtonBase = (
  props: any,
  ref: React.ForwardedRef<any>
) => {
  const {
    as,
    variant = 'primary',
    className,
    children,
    color = 'dark',
    borderColor = 'dark',
    disabled,
    style,
    ...rest
  } = props;

  const Component = as || 'button';

  const resolvedColor =
    typeof color === 'string' && colorMap[color as keyof typeof colorMap]
      ? colorMap[color as keyof typeof colorMap]
      : color;

  const resolvedBorder =
    typeof borderColor === 'string' &&
      colorMap[borderColor as keyof typeof colorMap]
      ? colorMap[borderColor as keyof typeof colorMap]
      : borderColor;

  const inlineStyles: React.CSSProperties = {
    ...(variant === 'primary' && {
      backgroundColor: resolvedColor,
      color: resolvedColor === '#1E2330' ? '#fff' : '#1E2330',
    }),
    ...(variant === 'secondary' && {
      borderColor: resolvedBorder,
      color: resolvedBorder,
    }),
    ...style,
  };

  const childrenLocal = typeof children === 'string' ? <Typography weight={variant === 'secondary' ? 'regular' : 'black'}>{children}</Typography> : children;

  return (
    <Component
      ref={ref}
      className={cx(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        className
      )}
      style={inlineStyles}
      disabled={Component === 'button' ? disabled : undefined}
      {...rest}
    >
      {childrenLocal}
    </Component>
  );
};

export const Button = React.forwardRef(ButtonBase) as ButtonComponent;