import React from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../utils/network-data";
import TaskInput from "../components/TaskInput";
import PropTypes from "prop-types";

function AddPage({ owner, refreshTasks, setTasks }) {
  const navigate = useNavigate();

  async function onAddTaskHandler(task) {
    addTask(task);
    setTasks((prevTasks) => [...prevTasks, task]);
    navigate("/");
    await refreshTasks();
  }

  return (
    <section>
      <TaskInput owner={owner} addTask={onAddTaskHandler} />
    </section>
  );
}

AddPage.propTypes = {
  owner: PropTypes.string.isRequired,
  refreshTasks: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default AddPage;
