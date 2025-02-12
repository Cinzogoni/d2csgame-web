import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { Fragment } from "react";
import LanguagesSwitcher from "../LanguagesSwitcher/LanguagesSwitcher";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import HeaderActions from "../HeaderActions/HeaderActions";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { Link } from "src/i18n/routing";

function Header() {
  return (
    <Fragment>
      <div className={cx("header-left")}>
        {/* @ts-ignore */}
        <Link href="/">
          <div className={cx("logo")}>
            <img
              className={cx("img")}
              src="/assets/img/d2csgame-logo.png"
              alt="d2csgame logo"
            />
          </div>
        </Link>
        <NavBar />
      </div>

      <div className={cx("header-right")}>
        <SearchBar />
        <ShoppingCart />
        <HeaderActions />
        <LanguagesSwitcher />
      </div>
    </Fragment>
  );
}

export default Header;
