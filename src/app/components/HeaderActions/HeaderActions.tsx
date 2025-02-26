"use client";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./HeaderActions.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useTranslations } from "next-intl";

import { useState } from "react";
import { Link, isNavigate } from "src/i18n/routing";
import { RootState } from "src/app/redux-toolkit/store";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "src/app/redux-toolkit/apiUsersResources";

function HeaderActions() {
  const tPrimary = useTranslations("Primary");
  const [infoShow, setInfoShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.apiUsers.currentUser
  );

  return (
    <div
      className={cx("wrapper")}
      style={{ backgroundColor: currentUser ? "#2c2c35" : "transparent" }}
    >
      <Link
        //@ts-expect-error: Map Link OK
        href={
          currentUser?.userName
            ? `/user/${currentUser.userName}`
            : "/authentication"
        }
        target="_blank"
        style={{ marginRight: "12px" }}
      >
        <div className={cx("account")} onMouseOver={() => setInfoShow(true)}>
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
      </Link>
      {infoShow && currentUser && (
        <div className={cx("info-box")}>
          <div className={cx("info")} onMouseLeave={() => setInfoShow(false)}>
            <Link
              //@ts-expect-error: Map Link OK
              href={isNavigate("/user/[userName]", {
                userName: currentUser?.userName,
              })}
              className={cx("info-manager")}
            >
              <h4 className={cx("info-title")}>{tPrimary("accountInfo")}</h4>
              <ManageAccountsIcon className={cx("account-manager")} />
            </Link>

            <div
              className={cx("info-manager")}
              onClick={() => dispatch(logout())}
            >
              <h4 className={cx("info-title")}>{tPrimary("logout")}</h4>
              <LogoutIcon className={cx("logout")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderActions;
