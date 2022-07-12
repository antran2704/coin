import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useViewport } from "../../../hooks/hook";
import Footer from "../../Footer/Footer";
import * as type from "../index";
import inputs from "./index";
import "./Login.scss";
import { useContext } from "react";
import { LoadingTheme } from "../../../App";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const captchaElement = useRef();
  const [captcha, setCaptcha] = useState(false);
  const {loading} = useContext(LoadingTheme);

  const [width] = useViewport();
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

  function checkCaptcha() {
    setCaptcha(true);
  }

  function handleCheckUser(e) {
    e.preventDefault();
    console.log("start");
    console.log(users);
    const messenger = document.querySelector(".messenger");
    const valueEmail = document.querySelector("input[name = email]").value;
    const valuePassword = document.querySelector(
      "input[name = password]"
    ).value;
    {
      users.length > 0 &&
        users.map((user, index) => {
          console.log(1);
          if (
            valueEmail == user.email &&
            valuePassword == user.password &&
            captcha === true
          ) {
            messenger.innerText = "";
            loading();
            window.location.href = "https://my-shop-coin.vercel.app/";
          } else {
            {
              console.log(2);

              valueEmail != user.email &&
                valuePassword != user.password &&
                captcha === true &&
                captchaElement.current.reset();
              messenger.innerText = "Email or password incorrect!";
              loading();
            }
          }
        });
    }

    if (users.length == 0 && valueEmail && valuePassword && captcha === true) {
      messenger.innerText = "Email or password incorrect!";
      captchaElement.current.reset();
      loading();
    }
  }
  return (
    <div className="lorgin__container margin-top">
      <div className="login">
        <div className="login__layout">
          <h3 className="login__header">LOG IN TO YOUR ACCOUNT</h3>
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
            sitekey="6Ld9vOEgAAAAAPaBQgDKRs3Iq55KSvuxj5_AFamI"
            size="normal"
            data-theme="dark"
            render="explicit"
            onChange={checkCaptcha}
          />
          <button
            onClick={function (e) {
              handleCheckUser(e, inputs);
            }}
            className="login__btn"
          >
            <a href="">Login</a>
          </button>
          <p className="messenger"></p>
          <a href="#" className="login__forgot-pasword">
            Forgot your password?
          </a>
        </div>
        <div className="login__footer">
          <p className="login__footer-header">
            Don't have an account?
            <a href="/signup" className="login__register">
              Register
            </a>
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

export default Login;
