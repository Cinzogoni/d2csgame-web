import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import styles from "./ShoppingCart.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { Link } from "src/i18n/routing";

function ShoppingCart() {
  return (
    <div className={cx("wrapper")}>
      <Link href="/shopping-cart">
        <div className={cx("cart")}>
          <h4 className={cx("quantity")}>0</h4>
          <ShoppingCartOutlinedIcon className={cx("icon")} />
        </div>
      </Link>
    </div>
  );
}

export default ShoppingCart;
