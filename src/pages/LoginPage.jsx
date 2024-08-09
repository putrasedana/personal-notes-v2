import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>{locale === "en" ? "Silakan login untuk menggunakan aplikasi." : "Please login to use the app."}</h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === "en" ? "Belum punya akun?" : "Don't have an account?"} <Link to="/register">{locale === "en" ? "Daftar di sini." : "Register here."}</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
