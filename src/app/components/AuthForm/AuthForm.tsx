"use client";

import styles from "./AuthForm.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import VisibilityIcon from "@mui/icons-material/Visibility";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "src/i18n/routing";
import { useLocale } from "next-intl";

import apiUser from "src/api/fakeApi/apiUser";
import { loginSuccess } from "src/app/redux-toolkit/apiUsersResources";
import { useDispatch } from "react-redux";

import { apiUsers } from "src/app/services/ProductService";

type AuthFormType = {
  formType: "login" | "signup";
  setFormType: (type: "login" | "signup") => void;
};

function AuthForm({ formType, setFormType }: AuthFormType) {
  const tPrimary = useTranslations("Primary");
  const [emailLogin, setEmailLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [emailSignUp, setEmailSignUp] = useState<string>("");
  const [passwordSignUp, setPasswordSignUp] = useState<string>("");
  const [checkPasswordSignUp, setCheckPasswordSignUp] = useState<string>("");
  const [isSignUpPasswordVisible, setIsSignUpPasswordVisible] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

  const isLoginEmail = apiUser.USER_001.map((e) => e.email);
  const isLoginPassword = apiUser.USER_001.map((e) => e.password);
  const dispatch = useDispatch();

  const router = useRouter();
  const locale = useLocale();

  const handleSwitchForm = (formType: "login" | "signup") => {
    setFormType(formType);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const fetchUser = () => {
      setIsLoginLoading(true);

      try {
        //lam_dev Thay apiUser bằng apiUsers
        const findUser = apiUser.USER_001.find(
          (u) => u.email === emailLogin && u.password === passwordLogin
        );
        if (findUser) {
          dispatch(loginSuccess(findUser));
          router.push("/", { locale });
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoginLoading(false);
      }
    };
    fetchUser();
  };

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("form-container")}>
        <Link href="/" target="_blank" className={cx("back-home")}>
          <ArrowBackIcon className={cx("back-icon")} />
          <h1 className={cx("brand-name")}>d2csgame</h1>
        </Link>

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
              <form className={cx("form")} onSubmit={handleLoginSubmit}>
                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="text"
                    placeholder={tPrimary("loginEmail")}
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    autoComplete="username"
                  />
                </div>
                {emailLogin && !isLoginEmail.includes(emailLogin) && (
                  <p className={cx("login-wrong")}>
                    {tPrimary("wrongLoginEmail")}
                  </p>
                )}

                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type={isLoginPasswordVisible ? "text" : "password"}
                    placeholder={tPrimary("loginPassword")}
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    autoComplete="current-password"
                  />

                  <VisibilityIcon
                    onMouseDown={() => setIsLoginPasswordVisible(true)}
                    onMouseUp={() => setIsLoginPasswordVisible(false)}
                    onMouseLeave={() => setIsLoginPasswordVisible(false)}
                    style={{
                      width: "36px",
                      height: "36px",
                      marginRight: "12px",
                    }}
                  />
                </div>
                {passwordLogin && !isLoginPassword.includes(passwordLogin) && (
                  <p className={cx("login-wrong")}>
                    {tPrimary("wrongLoginPassword")}
                  </p>
                )}

                {isLoginLoading ? (
                  <div className={cx("loading")}>
                    <AutorenewIcon className={cx("loading-icon")} />
                  </div>
                ) : (
                  <button className={cx("submit")} type="submit">
                    <h4 className={cx("login-submit")}>{tPrimary("login")}</h4>
                  </button>
                )}
              </form>

              <div className={cx("password")}>
                <p className={cx("forgot-password")}>
                  {tPrimary("forgotPassword")}
                </p>
              </div>

              <h1 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>
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
            </div>
          ) : (
            <div className={cx("frame")}>
              <form className={cx("form")} onSubmit={handleSignUpSubmit}>
                <div style={{ display: "none" }}>
                  <input
                    type="text"
                    autoComplete="username"
                    value={emailSignUp}
                    readOnly
                  />
                </div>

                <div className={cx("input-form")}>
                  <input
                    className={cx("input")}
                    type="text"
                    placeholder={tPrimary("signupEmail")}
                    value={emailSignUp}
                    onChange={(e) => setEmailSignUp(e.target.value)}
                    autoComplete="username"
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
                    value={passwordSignUp}
                    onChange={(e) => setPasswordSignUp(e.target.value)}
                    autoComplete="new-password"
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
                    value={checkPasswordSignUp}
                    onChange={(e) => setCheckPasswordSignUp(e.target.value)}
                    autoComplete="new-password"
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

                <button className={cx("submit")} type="submit">
                  <h4 className={cx("login-submit")}>{tPrimary("signup")}</h4>
                </button>
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
            </div>
          )}
        </div>
      </div>

      <div className={cx("background-frame")}>
        <img className={cx("background")} src="/assets/img/logo-dota2.png" />
      </div>
    </div>
  );
}

export default AuthForm;
