import { forwardRef } from "react";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import s from "./Button.module.css";

type ButtonProps = {
  as?: React.ReactElement | string;
  className?: string;
  variant?: "primary" | "secondary" | "success" | "error" | "info";
} & PropsWithChildren;

export default forwardRef(function Button(
  {
    as = "button",
    className = "",
    children,
    variant = "primary",
    ...rest
  }: ButtonProps,
  ref
) {
  // syntax highlighting is weird here since the props is called as which is ts keyword.
  // I still think as is the most fitting name for this type of prop.
  const Component = as as React.ElementType;
  return (
    <Component
      ref={ref}
      className={classNames(s.button, className, {
        [s.primary]: variant === "primary",
        [s.secondary]: variant === "secondary",
        [s.success]: variant === "success",
        [s.error]: variant === "error",
        [s.info]: variant === "info",
      })}
      {...rest}
    >
      {children}
    </Component>
  );
});
