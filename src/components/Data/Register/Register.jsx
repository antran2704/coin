import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useViewport } from "../../../hooks/hook";

import { useContext, useRef } from "react";
import { LoadingTheme } from "../../../App";
import Footer from "../../Footer/Footer";
import * as type from "../index";
import "../Login/Login.scss";
import inputs from "./index";
import "./Register.scss";

function Register() {
  const captchaElement = useRef();
  const navigate = useNavigate();
  const loading = useContext(LoadingTheme);
  const [width] = useViewport();
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("user") || [])
  );

  localStorage.setItem("user", JSON.stringify(user));

  function checkCaptcha() {
    setCaptcha(true);
  }

  function handleShowPassword(e) {
    const parent = e.target.closest(".login__wrap-input");
    const input = parent.querySelector(".login__input");
    if (showPassword) {
      input.type = "password";
      input.focus();
    } else {
      input.type = "text";
      input.focus();
    }
    setShowPassword(!showPassword);
  }

  function getValue(e, data) {
    e.preventDefault();
    let user = [];
    let created = true;

    data.map(function (item) {
      const input = document.querySelector(`input[name= ${item.name}]`);
      const value = input.value.trim();
      const wrap = input.closest(".login__wrap");
      const error = wrap.querySelector(".login__error");

      if (!value) {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "This field is required";
      }
      if (input.classList.contains("error")) {
        console.log("khong dang ky duoc");
      } else {
        user = { ...user, [item.name]: input.value };
      }
    });

    if (accounts.length > 0) {
      accounts.map((account) => {
        if (
          account.email == user.email &&
          account.name == user.name &&
          account.password == user.password &&
          captcha
        ) {
          const messenger = document.querySelector(".messenger");
          const valueEmail = document.querySelector("input[name = email]");
          const valueUserName = document.querySelector("input[name = name]");
          const valuePassword = document.querySelector(
            "input[name = password]"
          );
          messenger.innerText = "accout already exist!";
          valueEmail.value = "";
          valueUserName.value = "";
          valuePassword.value = "";
          created = false;
          captchaElement.current.reset();
        }
      });
      if (
        created === true &&
        user.name &&
        user.email &&
        user.password &&
        captcha
      ) {
        const messenger = document.querySelector(".messenger");
        messenger.innerText = "";
        setUser((prev) => [...prev, user]);
        setCaptcha(false);
        setLogin(true);
        loading();
      }
    } else {
      {
        user.name &&
          user.email &&
          user.password &&
          captcha &&
          setUser((prev) => [...prev, user]);
        const messenger = document.querySelector(".messenger");
        messenger.innerText = "";
        setCaptcha(false);
        setLogin(true);
        loading();
      }
    }
  }

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")));
    if (login === true) {
      window.location.pathname = "/login";
    }
    setLogin(false);
  }, [user]);

  return (
    <div className="lorgin__container margin-top">
      <div className="login">
        <div className="login__layout">
          <h3 className="login__header">REGISTER</h3>
          {inputs.map((input, index) => {
            return (
              <div key={index} className="login__wrap">
                <span className="login__title">{input.title}</span>
                <div className="login__wrap-input">
                  <input
                    onBlur={function (e) {
                      type.hanldeBlurInput(e);
                    }}
                    onChange={function (e) {
                      type.hanldeFocusInput(e);
                    }}
                    name={input.name}
                    className="login__input"
                    type={input.type}
                    placeholder={input.placeHolder}
                  />
                  {input.type == "password" &&
                    (showPassword ? (
                      <AiFillEye
                        onClick={function (e) {
                          handleShowPassword(e);
                        }}
                        className="login__eye login__eye--open"
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={function (e) {
                          handleShowPassword(e);
                        }}
                        className="login__eye login__eye--close"
                      />
                    ))}
                </div>
                <span className="login__error"></span>
              </div>
            );
          })}
          <ReCAPTCHA
            ref={captchaElement}
            // sitekey="6LeIl9kgAAAAACO7ozHnUjI-S2azK9sSyuTk-hIi"
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            size="normal"
            data-theme="dark"
            render="explicit"
            onChange={checkCaptcha}
          />
          <button
            onClick={(e) => {
              getValue(e, inputs);
            }}
            className="login__btn"
          >
            <a href="#">Register</a>
          </button>
          <p className="messenger"></p>
          <p className="signup-desc">
            By registering I confirm I have read and agree to Terms of Use. We
            send occasional marketing messages which can be switched off in
            account settings. We manage personal data as set out in our Privacy
            Notice.
          </p>
        </div>
        <div className="login__footer">
          <p className="login__footer-header">
            Already have an account?
            <Link to="/login" className="login__register">
              Login
            </Link>
          </p>
          <div className="login__footer-body">
            <a href="#" className="login__footer-link">
              Privacy Notice
            </a>
            <a href="#" className="login__footer-link">
              Cookies Notice
            </a>
            <a href="#" className="login__footer-link">
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
      {width > 700 && <Footer />}
    </div>
  );
}

export default Register;
