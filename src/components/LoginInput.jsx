import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/Useinput";
import LocaleContext from "../contexts/LocaleContext";

const LoginInput = ({ login }) => {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="email">{locale === "en" ? "Surel" : "Email"}</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={onEmailChange}
        placeholder={
          locale === "en" ? "Masukkan surel Anda" : "Enter your email"
        }
      />

      <label htmlFor="password">
        {locale === "en" ? "Kata Sandi" : "Password"}
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
        placeholder={
          locale === "en" ? "Masukkan kata sandi Anda" : "Enter your password"
        }
      />

      <button type="submit">{locale === "en" ? "Masuk" : "Login"}</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
