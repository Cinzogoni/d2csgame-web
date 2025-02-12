import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import { Fragment } from "react";

type FooterLink = "/policy" | "/guide" | "/support" | "/qna" | "/contact";

type FooterType = {
  id: number;
  title: string;
  link: FooterLink;
};

function Footer() {
  const t = useTranslations("Primary");

  const footer: readonly FooterType[] = [
    { id: 1, title: t("policy"), link: "/policy" },
    { id: 2, title: t("guides"), link: "/guide" },
    { id: 3, title: t("support"), link: "/support" },
    { id: 4, title: t("q&A"), link: "/qna" },
    { id: 5, title: t("contact"), link: "/contact" },
  ];

  return (
    <Fragment>
      <div className={cx("links")}>
        {footer.map((item, index) => {
          return (
            <Link key={index} href={item.link} className={cx("link")}>
              {item.title}
            </Link>
          );
        })}
      </div>

      <h1 className={cx("copyright")}>© 2025 d2csgame. All rights reserved.</h1>
    </Fragment>
  );
}

export default Footer;
