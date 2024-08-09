import React from "react";
import { FiCheck } from "react-icons/fi";
import PropTypes from "prop-types";
import useInput from "../hooks/Useinput";
import LocaleContext from "../contexts/LocaleContext";

function NoteInput({ owner, addNote }) {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote({
      id: `notes-${+new Date()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
      owner: { owner },
    });
  };

  return (
    <form className="add-new-page" onSubmit={handleSubmit}>
      <div className="add-new-page__input">
        <input className="add-new-page__input__title" type="text" value={title} onChange={onTitleChange} placeholder={locale === "en" ? "Catatan rahasia" : "Secret note"} required />
        <textarea className="add-new-page__input__body" value={body} onChange={onBodyChange} placeholder={locale === "en" ? "Sebenarnya saya adalah ...." : "Actually I am ...."} required />
        <div className="homepage__action">
          <button type="submit" className="action">
            <FiCheck />
          </button>
        </div>
      </div>
    </form>
  );
}

NoteInput.propTypes = {
  owner: PropTypes.string.isRequired,
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
