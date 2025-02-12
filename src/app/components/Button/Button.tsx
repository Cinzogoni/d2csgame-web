"use client";

import styles from "./Button.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { ReactNode } from "react";
import { Link } from "src/i18n/routing";

interface ButtonProps {
  children: ReactNode;
  link?: string;
}

function Button({ children, link }: ButtonProps) {
  return (
    // @ts-ignore
    <Link href={link} target="_blank">
      <button className={cx("btn")}>
        <h3 style={{ fontSize: "1.8rem", color: "rgba(255, 255, 255, 0.8)" }}>
          {children}
        </h3>
      </button>
    </Link>
  );
}

export default Button;
