"use client";

import styles from "./AuthForm.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useTranslations } from "next-intl";

import apiUser from "src/api/fakeApi/apiUser";
import { apiUsers } from "src/app/services/ProductService";

type AuthFormType = {
  formType: "login" | "signup";
  setFormType: (type: "login" | "signup") => void;
};

function AuthForm({ formType, setFormType }: AuthFormType) {
  const tPrimary = useTranslations("Primary");

  const handleSwitchForm = (formType: "login" | "signup") => {
    setFormType(formType);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("form-container")}>
        <h1 className={cx("brand-name")}>d2csgame</h1>

        <div className={cx("switch-form")}>
          <div className={cx("switch")}>
            <h2
              onClick={() => handleSwitchForm("login")}
              className={cx("title")}
              style={{
                boxShadow:
                  formType === "login"
                    ? "0 0 2px #232323"
                    : "0 0 2px transparent",
                backgroundColor:
                  formType === "login" ? "#2c2c35" : "transparent",
                color: formType === "login" ? "#ffffffcc" : "#34495e",
                transition: "all 0.15s ease",
              }}
            >
              {tPrimary("login")}
            </h2>

            <h2
              onClick={() => handleSwitchForm("signup")}
              className={cx("title")}
              style={{
                boxShadow:
                  formType === "signup"
                    ? "0 0 2px #232323"
                    : "0 0 2px transparent",
                backgroundColor:
                  formType === "signup" ? "#2c2c35" : "transparent",
                color: formType === "signup" ? "#ffffffcc" : "#34495e",
                transition: "all 0.15s ease",
              }}
            >
              {tPrimary("signup")}
            </h2>
          </div>

          {formType === "login" ? (
            <div className={cx("frame")}>
              <form className={cx("form")} onSubmit={handleSubmit}>
                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="text"
                    placeholder={tPrimary("loginEmail")}
                  />
                </div>
                <p className={cx("login-wrong")}>
                  {tPrimary("wrongLoginEmail")}
                </p>

                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="password"
                    placeholder={tPrimary("loginPassword")}
                  />

                  <VisibilityIcon
                    style={{
                      width: "36px",
                      height: "36px",
                      marginRight: "12px",
                    }}
                  />
                </div>
                <p className={cx("login-wrong")}>
                  {tPrimary("wrongLoginPassword")}
                </p>
              </form>

              <div className={cx("password")}>
                <p className={cx("forgot-password")}>
                  {tPrimary("forgotPassword")}
                </p>
              </div>

              <h1 style={{ fontSize: "2.4rem", margin: "24px 0 36px 0" }}>
                {tPrimary("Or")}
              </h1>

              <div className={cx("steam")}>
                <img
                  className={cx("icon")}
                  src="/assets/img/steam-logo.png"
                  alt="steam logo"
                />
                <h2 className={cx("login-steam")}>
                  {tPrimary("loginWithSteam")}
                </h2>
              </div>

              <button className={cx("submit")} type="submit">
                <h4 className={cx("login-submit")}>{tPrimary("login")}</h4>
              </button>
            </div>
          ) : (
            <div className={cx("frame")}>
              <form className={cx("form")} onSubmit={handleSubmit}>
                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="text"
                    placeholder={tPrimary("signupEmail")}
                  />
                </div>
                <p className={cx("login-wrong")}>
                  {tPrimary("wrongSignupEmail")}
                </p>

                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="password"
                    placeholder={tPrimary("signupPassword")}
                  />
                  <VisibilityIcon
                    style={{
                      width: "36px",
                      height: "36px",
                      marginRight: "12px",
                    }}
                  />
                </div>
                <p className={cx("login-wrong")}>
                  {tPrimary("wrongSignupPassword")}
                </p>

                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="password"
                    placeholder={tPrimary("signupMatchPassword")}
                  />
                  <VisibilityIcon
                    style={{
                      width: "36px",
                      height: "36px",
                      marginRight: "12px",
                    }}
                  />
                </div>

                <p className={cx("login-wrong")}>
                  {tPrimary("wrongMatchPassword")}
                </p>
              </form>

              <div className={cx("password")}>
                <p className={cx("forgot-password")}>
                  {tPrimary("forgotPassword")}
                </p>
              </div>

              <h1 style={{ fontSize: "2.4rem", margin: "24px 0 36px 0" }}>
                {tPrimary("Or")}
              </h1>

              <div className={cx("steam")}>
                <img
                  className={cx("icon")}
                  src="/assets/img/steam-logo.png"
                  alt="steam logo"
                />
                <h2 className={cx("login-steam")}>
                  {tPrimary("signupWithSteam")}
                </h2>
              </div>

              <button className={cx("submit")} type="submit">
                <h4 className={cx("login-submit")}>{tPrimary("signup")}</h4>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
