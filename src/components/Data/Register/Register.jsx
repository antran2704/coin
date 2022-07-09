import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ReCaptcha } from "react-recaptcha-google";
import { useEffect, useRef, useState } from "react";
import Footer from "../../Footer/Footer";
import "../Login/Login.scss";
import "./Register.scss";
import { useViewport } from "../../../hooks/hook";
import getValue from "../index";
import inputs from "./index";
import * as type from "../index";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [width] = useViewport();

  localStorage.setItem("user",JSON.stringify(user))

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
    setUser((prev) => [...prev,user])
  }

 useEffect(() => {
  console.log(JSON.parse(localStorage.getItem("user")))
 },[user])

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

          <button
            onClick={(e) => {
              getValue(e, inputs);
            }}
            className="login__btn"
          >
            <a href="#">Register</a>
          </button>
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
            <a href="/login" className="login__register">
              Login
            </a>
          </p>
          <div className="login__footer-body">
            <a href="/" className="login__footer-link">
              Privacy Notice
            </a>
            <a href="/" className="login__footer-link">
              Cookies Notice
            </a>
            <a href="/" className="login__footer-link">
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
