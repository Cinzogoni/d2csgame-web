import React from "react";

import styles from "../SteamGroupTemplate/SteamGroupTemplate.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function SteamGroupTemplate() {
  return <div className={cx("wrapper")}></div>;
}

export default SteamGroupTemplate;
