import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../components/SearchBar";
import TasksList from "../components/TasksList";
import { FiPlus } from "react-icons/fi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import Tooltip from "../components/Tooltip";

function HomePage({ tasks, loading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const location = useLocation();
  const isArchivePage = location.pathname.includes("/archive");
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { locale } = React.useContext(LocaleContext);

  useEffect(() => {
    setSearchParams({ query: searchQuery });
  }, [searchQuery]);

  return (
    <section>
      <h2>
        {isArchivePage
          ? locale === "en"
            ? "Tugas Terarsip"
            : "Archived Tasks"
          : locale === "en"
          ? "Tugas Aktif"
          : "Active Tasks"}
      </h2>
      <SearchBar onSearch={setSearchQuery} query={searchQuery} />
      <TasksList tasks={filteredTasks} loading={loading} />
      {!isArchivePage && (
        <div className="homepage__action">
          <Tooltip text="Add button">
            <Link to="/tasks/new" className="action">
              <FiPlus />
            </Link>
          </Tooltip>
        </div>
      )}
    </section>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePage;
