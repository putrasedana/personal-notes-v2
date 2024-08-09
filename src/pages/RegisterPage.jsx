import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>{locale === "en" ? "Isi form untuk mendaftar akun." : "Fill out the form to register an account."}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "en" ? "Sudah punya akun?" : "Already have an account?"} <Link to="/">{locale === "en" ? "Login di sini" : "Login here"}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
