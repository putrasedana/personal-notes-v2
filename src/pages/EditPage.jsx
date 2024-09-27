import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { editTask } from "../utils/network-data";
import EditInput from "../components/EditInput";

function EditPage({ tasks, refreshTasks }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === id);
    setTask(selectedTask);
  }, [id, tasks]);

  if (!task) {
    return null;
  }

  const handleEditSubmit = (editedTask) => {
    editTask(id, editedTask);
    refreshTasks();

    if (task.archived) {
      navigate("/archives");
    } else {
      navigate("/");
    }
  };

  return (
    <section className="edit-page">
      <EditInput task={task} onSubmit={handleEditSubmit} />
    </section>
  );
}

EditPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EditPage;
