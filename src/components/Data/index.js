export function getValue(types) {
  types.map(function (type) {
    const input = document.querySelector(`input[name= ${type}]`);
    console.log(input);
  });
}

export function hanldeBlurInput(e) {
  const input = e.target;
  const wrap = input.closest(".login__wrap");
  const error = wrap.querySelector(".login__error");
  const value = input.value.trim();
  if (!value) {
    input.classList.add("error");
    input.classList.remove("succes");
    error.innerText = "This field is required";
  }
  if (value) {
    if (input.name == "password") {
      const min = 6;
      if (value.length < min) {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "Password must be at least 6 characters";
      } else {
        input.classList.remove("error");
        input.classList.add("succes");
        error.innerText = "";
      }
    }

    if (input.name == "email") {
      const valueEmail = value.toLowerCase();
      if (
        valueEmail.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        input.classList.remove("error");
        input.classList.add("succes");
        error.innerText = "";
      } else {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "Your email address is not correct";
      }
    }

    if (input.name == "name") {
      const min = 4;
      if (value.length < min) {
        input.classList.add("error");
        input.classList.remove("succes");
        error.innerText = "User name must be at least 4 characters";
      } else {
        input.classList.remove("error");
        input.classList.add("succes");
        error.innerText = "";
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
