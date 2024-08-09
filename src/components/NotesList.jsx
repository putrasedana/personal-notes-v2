import React from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NotesList({ notes, loading }) {
  const { locale } = React.useContext(LocaleContext);

  if (loading) {
    return <div>{locale === "en" ? "Memuat Catatan ..." : "Fetching Notes ..."}</div>;
  }

  return (
    <div>
      {notes.length === 0 ? (
        <div className="notes-list-empty">
          <p>{locale === "en" ? "Tidak ada catatan" : "No notes"}</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteItem key={note.id} {...note} />
          ))}
        </div>
      )}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NotesList;
