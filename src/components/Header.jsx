import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import LocaleContext from "../contexts/LocaleContext";

function Header({ logout, name }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <header>
      <h1>
        <Link to="/">
          {locale === "id" ? "Task Management App" : "Aplikasi Manajemen Tugas"}
        </Link>
      </h1>
      <Navigation logout={logout} name={name} />
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
