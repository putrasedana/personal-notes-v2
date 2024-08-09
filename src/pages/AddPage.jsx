import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import NoteInput from "../components/NoteInput";
import PropTypes from "prop-types";

function AddPage({ owner, refreshNotes, setNotes }) {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    addNote(note);
    setNotes((prevNotes) => [...prevNotes, note]);
    navigate("/");
    await refreshNotes();
  }

  return (
    <section>
      <NoteInput owner={owner} addNote={onAddNoteHandler} />
    </section>
  );
}

AddPage.propTypes = {
  owner: PropTypes.string.isRequired,
  refreshNotes: PropTypes.func.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default AddPage;
