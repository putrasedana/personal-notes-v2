import React from "react";
import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import LocaleContext from "../contexts/LocaleContext";

function TasksList({ tasks, loading }) {
  const { locale } = React.useContext(LocaleContext);

  if (loading) {
    return (
      <div>{locale === "en" ? "Memuat Tugas ..." : "Fetching Tasks ..."}</div>
    );
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="tasks-list-empty">
          <p>{locale === "en" ? "Tidak ada tugas" : "No tasks"}</p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </div>
      )}
    </div>
  );
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TasksList;
