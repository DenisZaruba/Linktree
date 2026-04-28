'use client';

import cx from 'classnames';
import React from 'react';
import styles from './Input.module.scss';

type Variant = 'default' | 'outline' | 'ghost';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  variant?: Variant;
  error?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      wrapperClassName,
      variant = 'default',
      error,
      label,
      leftIcon,
      rightIcon,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const innerRef = React.useRef<HTMLInputElement | null>(null);

    // 🔥 синхронізація зовнішнього ref
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    return (
      <div className={cx(styles.wrapper, wrapperClassName)}>
        {label && (
          <label
            className={cx(styles.label, {
              [styles.labelFocused]: isFocused || innerRef.current?.value,
            })}
          >
            {label}
          </label>
        )}

        <div
          onClick={() => innerRef.current?.focus()}
          className={cx(
            styles.inputWrapper,
            styles[variant],
            error && styles.error,
            disabled && styles.disabled
          )}
        >
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

          <input
            ref={innerRef}
            className={cx(styles.input, className)}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />

          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </div>

        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;