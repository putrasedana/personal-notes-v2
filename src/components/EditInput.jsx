import React, { useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import { FiCheck } from "react-icons/fi";
import ThemeContext from "../contexts/ThemeContext";

function EditInput({ task, onSubmit }) {
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
  const [status, setStatus] = useState(task.status || "to-do");
  const { theme } = React.useContext(ThemeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      status,
      body,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="edit-page__input">
        <input
          className="edit-page__input__title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="edit-page__input__status"
          value={status}
          style={{ color: theme === "light" ? "#333" : "white" }}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="to-do">to-do</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>
        <textarea
          className="edit-page__input__body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div className="homepage__action">
          <Tooltip text="Save button">
            <button type="submit" className="action">
              <FiCheck />
            </button>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}

EditInput.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditInput;
