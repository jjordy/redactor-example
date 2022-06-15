import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import s from "./Alert.module.css";

type AlertProps = {
  active?: boolean;
  className: string;
} & React.HTMLProps<HTMLButtonElement>;

export default function Alert({
  className,
  children,
  active,
  style = {},
}: AlertProps) {
  return (
    <div
      className={classNames(s.alert, className, {
        "opacity-1": active,
        "opacity-0": !active,
      })}
      style={style}
    >
      {children}
    </div>
  );
}
