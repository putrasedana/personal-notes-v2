import React from "react";
import PropTypes from "prop-types";
import TaskDetail from "../components/TaskDetail";
import { archiveTask, deleteTask, unarchiveTask } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function DetailPage({ tasks, refreshTasks }) {
  const { locale } = React.useContext(LocaleContext);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      locale === "en"
        ? "Apakah Anda yakin ingin menghapus catatan ini?"
        : "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      await deleteTask(id);
      await refreshTasks();
    }
  };

  const handleArchive = async (id) => {
    await archiveTask(id);
    await refreshTasks();
  };

  const handleUnarchive = async (id) => {
    await unarchiveTask(id);
    await refreshTasks();
  };

  return (
    <section>
      <TaskDetail
        tasks={tasks}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
      />
    </section>
  );
}

DetailPage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  refreshTasks: PropTypes.func.isRequired,
};

export default DetailPage;
