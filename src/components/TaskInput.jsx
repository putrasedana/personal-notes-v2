import React from "react";
import { FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";
import useInput from "../hooks/Useinput";
import LocaleContext from "../contexts/LocaleContext";
import Tooltip from "./Tooltip";

function TaskInput({ owner, addTask }) {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    addTask({
      id: `tasks-${+new Date()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
      owner: { owner },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder={locale === "en" ? "Tugas baru" : "New task"}
          required
        />
        <textarea
          className="add-new-page__input__body"
          value={body}
          onChange={onBodyChange}
          placeholder={
            locale === "en"
              ? "Tambahkan tugas baru ...."
              : "Add a new task ...."
          }
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

TaskInput.propTypes = {
  owner: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default TaskInput;
