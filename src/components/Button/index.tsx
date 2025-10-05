import { ButtonHTMLAttributes, forwardRef } from "react";
import Spinner from "../Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "small" | "large";
  color?: "primary" | "secondary" | "black";
  variant?: "default" | "outline" | "glass";
  active?: boolean;
  block?: boolean;
  wide?: boolean;
  circle?: boolean;
  square?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "medium",
      color = "primary",
      variant = "default",
      active = false,
      block = false,
      wide = false,
      circle = false,
      square = false,
      loading = false,
      iconPrefix,
      iconSuffix,
      children,
      className,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const baseClasses = `flex justify-center items-center button-bg-${color} button-variant-${variant} button-hover disabled:opacity-70 disabled:hover:cursor-not-allowed disabled:hover:opacity-70`;
    const mergedClasses = className
      ? `${baseClasses} ${className}`
      : baseClasses;

    return (
      <button
        {...rest}
        ref={ref}
        data-is-active={active}
        className={mergedClasses}
      >
        {iconPrefix && iconPrefix}
        {loading ? <Spinner size={size} /> : children}
        {iconSuffix && iconSuffix}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
