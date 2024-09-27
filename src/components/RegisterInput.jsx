import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/Useinput";
import LocaleContext from "../contexts/LocaleContext";

const RegisterInput = ({ register }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert(
        locale === "en"
          ? "Password dan Konfirmasi Password tidak cocok"
          : "Password and Confirm Password do not match"
      );
      return;
    }
    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">{locale === "en" ? "Nama" : "Name"}</label>
      <input
        type="text"
        id="name"
        placeholder={locale === "en" ? "Masukkan nama Anda" : "Enter your name"}
        value={name}
        onChange={onNameChange}
      />

      <label htmlFor="email">{locale === "en" ? "Surel" : "Email"}</label>
      <input
        type="email"
        id="email"
        placeholder={
          locale === "en" ? "Masukkan surel Anda" : "Enter your email"
        }
        value={email}
        onChange={onEmailChange}
      />

      <label htmlFor="password">
        {locale === "en" ? "Kata Sandi" : "Password"}
      </label>
      <input
        type="password"
        id="password"
        placeholder={
          locale === "en" ? "Masukkan kata sandi Anda" : "Enter your password"
        }
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
      />

      <label htmlFor="confirm-password">
        {locale === "en" ? "Konfirmasi Kata Sandi" : "Confirm Password"}
      </label>
      <input
        type="password"
        id="confirm-password"
        placeholder={
          locale === "en"
            ? "Masukkan ulang kata sandi Anda"
            : "Confirm your password"
        }
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />

      <button type="submit">{locale === "en" ? "Daftar" : "Register"}</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
