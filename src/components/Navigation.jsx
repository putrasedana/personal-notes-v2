import React from "react";
import PropTypes from "prop-types";
import { BsTranslate } from "react-icons/bs";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";
import LocaleContext from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  return (
    <>
      {name && (
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives"> {locale === "id" ? "Archived" : "Terarsip"}</Link>
            </li>
          </ul>
        </nav>
      )}

      <button className="toggle-locale" type="button" onClick={toggleLocale}>
        <BsTranslate />
      </button>

      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>

      {name && (
        <button className="button-logout" type="button" onClick={logout}>
          <FiLogOut /> {name}
        </button>
      )}
    </>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
