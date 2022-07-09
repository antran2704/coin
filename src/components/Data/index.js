export function getValue(e, data) {
  e.preventDefault();
  const localStorage = [];
  var user = [];

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
  localStorage.push(user);
  console.log(localStorage);
}

function checkError(input, error) {
  input.classList.add("error");
  input.classList.remove("succes");
  error.innerText = "This field is required";
}

function checkSucces(input, error) {
  input.classList.remove("error");
  input.classList.add("succes");
  error.innerText = "";
}
export function hanldeBlurInput(e) {
  const input = e.target;
  const wrap = input.closest(".login__wrap");
  const error = wrap.querySelector(".login__error");
  const value = input.value.trim();
  if (!value) {
    checkError(input, error);
  }
  if (value) {
    if (input.name === "password") {
      const min = 6;
      if (value.length < min) {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "Password must be at least 6 characters";
      } else {
        checkSucces(input, error)
      }
    }

    if (input.name === "email") {
      const valueEmail = value.toLowerCase();
      if (
        valueEmail.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        checkSucces(input, error)
      } else {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "Your email address is not correct";
      }
    }

    if (input.name === "name") {
      const min = 4;
      if (value.length < min) {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "User name must be at least 4 characters";
      } else {
        checkSucces(input, error)
      }
    }
  }
}

export function hanldeFocusInput(e) {
  const input = e.target;
  const wrap = input.closest(".login__wrap");
  const error = wrap.querySelector(".login__error");
  input.classList.remove("error");
  error.innerText = "";
}
