import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate, statusColor } from "../utils";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function TaskItem({ id, title, body, status, createdAt }) {
  const MAX_TITLE_LENGTH = 40;
  const MAX_BODY_LENGTH = 150;
  const { locale } = React.useContext(LocaleContext);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="task-item">
      <h3 className="task-item__title">
        <Link to={`/task/${id}`}>{truncateText(title, MAX_TITLE_LENGTH)}</Link>
      </h3>
      <p className="task-item__createdAt">
        {locale === "id"
          ? showFormattedDate(createdAt, "en-US")
          : showFormattedDate(createdAt)}
      </p>
      <div className="task-item__status" style={{ color: statusColor(status) }}>
        <span className="task-item__status-dot">•</span>
        <span>{status}</span>
      </div>
      <p className="task-item__body">{truncateText(body, MAX_BODY_LENGTH)}</p>
    </div>
  );
}

TaskItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TaskItem;
