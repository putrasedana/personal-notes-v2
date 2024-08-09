import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import { getActiveNotes, getArchivedNotes, getUserLogged, putAccessToken } from "./utils/network-data.js";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ThemeContext from "./contexts/ThemeContext.js";
import LocaleContext from "./contexts/LocaleContext.js";
import Header from "./components/Header.jsx";

function App() {
  const [notes, setNotes] = useState([]);
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
      const fetchNotes = async () => {
        try {
          setLoading(true);
          const { data: activeNotes } = await getActiveNotes();
          const { data: archivedNotes } = await getArchivedNotes();

          const allNotes = [...activeNotes, ...archivedNotes];

          setNotes(allNotes);
        } catch (err) {
          console.error("An unexpected error occurred:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchNotes();
    }
  }, [authedUser]);

  const refreshNotes = async () => {
    try {
      setLoading(true);
      const { data: activeNotes } = await getActiveNotes();
      const { data: archivedNotes } = await getArchivedNotes();
      const allNotes = [...activeNotes, ...archivedNotes];
      setNotes(allNotes);
    } catch (err) {
      console.error("Failed to refresh notes:", err);
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
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
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
              <Route path="/" element={<HomePage notes={notes.filter((note) => !note.archived)} loading={loading} />} />
              <Route path="/archives" element={<HomePage notes={notes.filter((note) => note.archived)} loading={loading} />} />
              <Route path="/note/:id" element={<DetailPage notes={notes} refreshNotes={refreshNotes} />} />
              <Route path="/notes/new" element={<AddPage owner={authedUser.name} refreshNotes={refreshNotes} setNotes={setNotes} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default App;
