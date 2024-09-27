import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate, statusColor } from "../utils";
import { FiArchive, FiTrash, FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import LocaleContext from "../contexts/LocaleContext";

function TaskDetail({ tasks, onDelete, onArchive, onUnarchive }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === id);
    if (selectedTask) {
      setTask(selectedTask);
    } else {
      navigate("/NotFoundPage");
    }
  }, [id, tasks, navigate]);

  if (!task) {
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
    task.archived ? navigate("/archives") : navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{task.title}</h3>
      <p className="detail-page__createdAt">
        {locale === "id"
          ? showFormattedDate(task.createdAt, "en-US")
          : showFormattedDate(task.createdAt)}
      </p>
      <div
        className="task-detail__status"
        style={{ color: statusColor(task.status) }}
      >
        <span className="task-item__status-dot">•</span>
        <span>{task.status}</span>
      </div>
      <div className="detail-page__body">{task.body}</div>
      <div className="detail-page__action">
        {task.archived ? (
          <Tooltip text="Unarchive button">
            <button className="action" type="button" onClick={handleUnarchive}>
              <FiArchive />
            </button>
          </Tooltip>
        ) : (
          <Tooltip text="Archive button">
            <button className="action" type="button" onClick={handleArchive}>
              <FiArchive />
            </button>
          </Tooltip>
        )}
        <Tooltip text="Edit button">
          <button className="action" type="button" onClick={handleEdit}>
            <FiEdit />
          </button>
        </Tooltip>
        <Tooltip text="Delete button">
          <button className="action" type="button" onClick={handleDelete}>
            <FiTrash />
          </button>
        </Tooltip>
      </div>
    </section>
  );
}

TaskDetail.propTypes = {
  tasks: PropTypes.arrayOf(
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

export default TaskDetail;
