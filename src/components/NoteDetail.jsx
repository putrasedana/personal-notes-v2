import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { FiArchive, FiTrash } from "react-icons/fi";
import PropTypes from "prop-types";

function DetailPage({ notes, onDelete, onArchive, onUnarchive }) {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedNote = notes.find((note) => note.id === id);
    setNote(selectedNote);
  }, [id, notes]);

  useEffect(() => {
    if (note === undefined) {
      navigate("/NotFoundPage");
    }
  }, [note, navigate]);

  if (!note) {
    return null;
  }

  const handleArchive = () => {
    onArchive(id);
    navigate("/");
  };

  const handleUnarchive = () => {
    onUnarchive(id);
    navigate("/archives");
  };

  const handleDelete = () => {
    onDelete(id);
    note.archived ? navigate("/archives") : navigate("/");
  };

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>
      <div className="detail-page__action">
        {note.archived ? (
          <button className="action" type="button" onClick={handleUnarchive}>
            <FiArchive />
          </button>
        ) : (
          <button className="action" type="button" onClick={handleArchive}>
            <FiArchive />
          </button>
        )}
        <button className="action" type="button" onClick={handleDelete}>
          <FiTrash />
        </button>
      </div>
    </section>
  );
}

DetailPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default DetailPage;
