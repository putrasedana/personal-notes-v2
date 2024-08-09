import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";

function NoteItem({ id, title, body, createdAt }) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/note/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
