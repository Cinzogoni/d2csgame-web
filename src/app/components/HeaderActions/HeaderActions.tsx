"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styles from "./HeaderActions.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { Link } from "src/i18n/routing";
import { RootState } from "src/app/redux-toolkit/store";
import { useSelector } from "react-redux";

function HeaderActions() {
  const currentUser = useSelector(
    (state: RootState) => state.apiUsers.currentUser
  );

  return (
    <Link
      //@ts-ignore
      href={
        currentUser?.userName
          ? `/user/${currentUser.userName}`
          : "/authentication"
      }
      target="_blank"
      style={{ marginRight: "12px" }}
    >
      <div
        className={cx("wrapper")}
        style={{ backgroundColor: currentUser ? "#2c2c35" : "transparent" }}
      >
        <div className={cx("account")}>
          <div
            className={cx("arrow-down")}
            style={{
              borderTop: currentUser
                ? "10px solid #ffffffd9"
                : "10px solid #34495e",
            }}
          />
          <AccountCircleOutlinedIcon
            className={cx("icon")}
            style={{ color: currentUser ? "#ffffffd9" : "#34495e" }}
          />
        </div>
      </div>
    </Link>
  );
}

export default HeaderActions;
