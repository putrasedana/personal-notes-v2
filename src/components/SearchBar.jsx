import React from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({ onSearch, query }) {
  const { locale } = React.useContext(LocaleContext);

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <section className="search-bar">
      <input
        className="search-bar"
        type="text"
        placeholder={
          locale === "en" ? "Cari berdasarkan judul ..." : "Search by title ..."
        }
        value={query}
        onChange={handleSearchChange}
      />
    </section>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default SearchBar;
