const form = document.getElementById("login-form");
const emailField = form.email;
const passwordField = form.password;
const formBtn = document.querySelector(".form-btn");
const submit = document.querySelector("#input-submit");

const isRequierd = (value) => (value === "" ? false : true);

const isEmailValid = (email) => {
  const regexE =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexE.test(email);
};

//show success message
const showSuccess = (input) => {
  const formParentFiled = input.parentElement;

  const error = formParentFiled.querySelector("p");
  error.textContent = "";
};

//show error message
const showError = (input, message) => {
  const formParentFiled = input.parentElement;

  const error = formParentFiled.querySelector("p");
  error.textContent = message;
};

//check email
const chackEmail = () => {
  let valid = false;
  const email = emailField.value.trim();

  if (!isRequierd(email)) {
    showError(emailField, "email is requerd!");
  } else if (!isEmailValid(email)) {
    showError(emailField, "email is not valid!");
  } else {
    showSuccess(emailField);
    valid = true;
    formBtn.style.textAlign = "center";
  }
  return valid;
};

//chack password
const chackPassword = () => {
  let valid = false;
  const password = passwordField.value.trim();

  if (!isRequierd(password)) {
    showError(passwordField, "password is required!");
  } else if (password.length < 6) {
    showError(passwordField, "password must be 6 charachs or long!");
  } else {
    showSuccess(passwordField);
    valid = true;
    formBtn.style.textAlign = "center";
  }
  return valid;
};

//debounce function
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

//on input change
form.addEventListener(
  "input",
  debounce(function (event) {
    switch (event.target.name) {
      case "email":
        chackEmail();
        break;
      case "password":
        chackPassword();
        break;
    }
  })
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener(
  "submit",
  debounce(function (event) {
    event.preventDefault();

    let isEmail = chackEmail(),
      isPassword = chackPassword();
    let isFormValid = isEmail && isPassword;
    if (isFormValid) {
      alert(`Email : ${emailField.value} , Password : ${passwordField.value}`);
    }
  })
);
