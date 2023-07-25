import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import { link } from "./styles.css";

export const SKLink = ({ children, ...rest }: PropsWithChildren<LinkProps>) => {
  return (
    <Link className={link} {...rest}>
      {children}
    </Link>
  );
};
