import styles from "../ButtonAddToCart/ButtonAddToCart.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useTranslations } from "next-intl";

type ButtonAddToCartProps = {
  quantity: number;
};

function ButtonAddToCart({ quantity }: ButtonAddToCartProps) {
  const tHeros = useTranslations("Heros");

  return (
    <div className={cx("wrapper")}>
      <div className={cx("action")}>
        <button className={cx("btn")}>
          <AddShoppingCartIcon className={cx("icon")} />
          <p className={cx("call")}>{tHeros("heroBtnCall")}</p>
        </button>
      </div>

      {quantity !== 0 ? (
        <div className={cx("status")}>
          <p className={cx("condition")}>
            {tHeros("heroBtnCondition")} {tHeros("heroBtnAvailable")}
          </p>
          <div className={cx("separation")} />
          <p className={cx("quantity")}>
            {tHeros("heroBtnQuantity")} {quantity}
          </p>
        </div>
      ) : (
        <div className={cx("status")}>
          <p className={cx("condition")}>
            {tHeros("heroBtnCondition")} {tHeros("heroBtnUnavailable")}
          </p>
          <div className={cx("separation")} />
          <p className={cx("quantity")}>{tHeros("heroBtnQuantity")} 0</p>
        </div>
      )}
    </div>
  );
}

export default ButtonAddToCart;
