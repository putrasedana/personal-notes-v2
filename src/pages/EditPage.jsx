import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { editTask } from "../utils/network-data";
import EditInput from "../components/EditInput";

function EditPage({ tasks, refreshTasks }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === id);
    setTask(selectedTask);
  }, [id, tasks]);

  if (!task) {
    return null;
  }

  const handleEditSubmit = async (editedTask) => {
    setLoading(true);
    try {
      await editTask(id, editedTask);
      await refreshTasks();

      if (task.archived) {
        navigate("/archives");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to edit task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="edit-loading">
          <p>Loading...</p>
        </div>
      ) : (
        <section className="edit-page">
          <EditInput task={task} onSubmit={handleEditSubmit} />
        </section>
      )}
    </>
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
  refreshTasks: PropTypes.func.isRequired,
};

export default EditPage;
