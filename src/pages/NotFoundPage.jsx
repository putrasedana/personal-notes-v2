import React from "react";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function NotFoundPage() {
  const { locale } = React.useContext(LocaleContext);

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">{locale === "en" ? "Halaman yang Anda cari tidak ditemukan." : "The page you are looking for cannot be found."}</p>
      <Link to="/" className="not-found__link">
        {locale === "en" ? "Kembali ke Homepage" : "Back to Homepage"}
      </Link>
    </div>
  );
}

export default NotFoundPage;
