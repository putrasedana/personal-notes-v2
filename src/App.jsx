import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import {
  getActiveTasks,
  getArchivedTasks,
  getUserLogged,
  putAccessToken,
} from "./utils/network-data.js";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ThemeContext from "./contexts/ThemeContext.js";
import LocaleContext from "./contexts/LocaleContext.js";
import Header from "./components/Header.jsx";
import EditPage from "./pages/EditPage.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (authedUser !== null) {
      const fetchTasks = async () => {
        try {
          setLoading(true);
          const { data: activeTasks } = await getActiveTasks();
          const { data: archivedTasks } = await getArchivedTasks();

          const allTasks = [...activeTasks, ...archivedTasks];

          setTasks(allTasks);
        } catch (err) {
          console.error("An unexpected error occurred:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [authedUser]);

  const refreshTasks = async () => {
    try {
      setLoading(true);
      const { data: activeTasks } = await getActiveTasks();
      const { data: archivedTasks } = await getArchivedTasks();
      const allTasks = [...activeTasks, ...archivedTasks];
      setTasks(allTasks);
    } catch (err) {
      console.error("Failed to refresh tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const toggleLocale = useCallback(() => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  }, []);

  const localeContext = {
    locale,
    toggleLocale,
  };

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeContext = {
    theme,
    toggleTheme,
  };

  if (initializing) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContext}>
        <ThemeContext.Provider value={themeContext}>
          <div className="app-container">
            <Header logout={onLogout} name="" />
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContext}>
      <ThemeContext.Provider value={themeContext}>
        <div className="app-container">
          <Header logout={onLogout} name={authedUser.name} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    tasks={tasks.filter((task) => !task.archived)}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/archives"
                element={
                  <HomePage
                    tasks={tasks.filter((task) => task.archived)}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/task/:id"
                element={
                  <DetailPage tasks={tasks} refreshTasks={refreshTasks} />
                }
              />
              <Route
                path="/tasks/new"
                element={
                  <AddPage
                    owner={authedUser.name}
                    refreshTasks={refreshTasks}
                    setTasks={setTasks}
                  />
                }
              />
              <Route
                path="/edit/:id"
                element={<EditPage refreshTasks={refreshTasks} tasks={tasks} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
