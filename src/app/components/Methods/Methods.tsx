import styles from "../Methods/Methods.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import {
  FaHandHoldingUsd,
  FaCreditCard,
  FaFacebook,
  FaShopify,
} from "react-icons/fa";

import { Link } from "src/i18n/routing";
import { getTranslations } from "next-intl/server";

async function Methods() {
  const t = await getTranslations("Primary");
  return (
    <section className={cx("methods")}>
      <Link href="/buying" className={cx("link")}>
        <div className={cx("box")}>
          <FaShopify className={cx("icon")} />
          <h4 className={cx("category")}>{t("buyingGuide")}</h4>
        </div>
      </Link>

      <Link href="/selling" className={cx("link")}>
        <div className={cx("box")}>
          <FaHandHoldingUsd className={cx("icon")} />
          <h4 className={cx("category")}>{t("sellingGuide")}</h4>
        </div>
      </Link>

      <Link href="/payment" className={cx("link")}>
        <div className={cx("box")}>
          <FaCreditCard className={cx("icon")} />
          <h4 className={cx("category")}>{t("paymentMethods")}</h4>
        </div>
      </Link>

      <Link href="/fan-page" className={cx("link")}>
        <div className={cx("box")}>
          <FaFacebook className={cx("icon")} />
          <h4 className={cx("category")}>{t("fanPage")}</h4>
        </div>
      </Link>
    </section>
  );
}

export default Methods;
