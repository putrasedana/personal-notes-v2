import React from "react";
import PropTypes from "prop-types";
import NoteDetail from "../components/NoteDetail";
import { archiveNote, deleteNote, unarchiveNote } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function DetailPage({ notes, refreshNotes }) {
  const { locale } = React.useContext(LocaleContext);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(locale === "en" ? "Apakah Anda yakin ingin menghapus catatan ini?" : "Are you sure you want to delete this note?");
    if (confirmed) {
      await deleteNote(id);
      await refreshNotes();
    }
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    await refreshNotes();
  };

  const handleUnarchive = async (id) => {
    await unarchiveNote(id);
    await refreshNotes();
  };

  return (
    <section>
      <NoteDetail notes={notes} onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive} />
    </section>
  );
}

DetailPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  refreshNotes: PropTypes.func.isRequired,
};

export default DetailPage;
