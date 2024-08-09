import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import { FiPlus } from "react-icons/fi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function HomePage({ notes, loading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const location = useLocation();
  const isArchivePage = location.pathname.includes("/archive");
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const { locale } = React.useContext(LocaleContext);

  useEffect(() => {
    setSearchParams({ query: searchQuery });
  }, [searchQuery]);

  return (
    <section>
      <h2>{isArchivePage ? (locale === "en" ? "Catatan Arsip" : "Archived Notes") : locale === "en" ? "Catatan Aktif" : "Active Notes"}</h2>
      <SearchBar onSearch={setSearchQuery} query={searchQuery} />
      <NotesList notes={filteredNotes} loading={loading} />
      {!isArchivePage && (
        <div className="homepage__action">
          <Link to="/notes/new" className="action">
            <FiPlus />
          </Link>
        </div>
      )}
    </section>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePage;
