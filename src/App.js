import Header from './components/header'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/main'
import About from './pages/about'
import Contacts from './pages/contacts'
import Profile from './pages/userProfile'
import { useState, useEffect } from 'react';
import { ThemeProvider } from "./components/ThemeContext";
import AuthModal from './components/AuthModal'
import { api } from './api/users'

function App() {
  // null = checking, true = authed, false = not authed
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userData, setUserData] = useState(null);

  // On mount: verify token with backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    api.get("/api/profile/")
      .then(res => {
        setUserData(res.data);       // ✅ store user data immediately
        setIsAuthenticated(true);
      })
      .catch(err => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
        }
        setIsAuthenticated(false);
      });
  }, []);

  // Called by Login/Register after successful auth
  const handleAuth = async () => {
    try {
      const res = await api.get("/api/profile/");
      setUserData(res.data);         // ✅ fetch & store user data right after login
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  // Handle logout from ProfilePage
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsAuthenticated(false);
  };

  // Still verifying — show spinner
  if (isAuthenticated === null) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AuthModal isAuthenticated={isAuthenticated} onAuth={handleAuth} />
      <Header />
      <Routes>
        <Route path="/main"     element={<Main isAuthenticated={isAuthenticated} />} />
        <Route path="/about"    element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        {/* ✅ Pass all props to Profile, not to Route */}
        <Route path="/profile"  element={
          <Profile
            userData={userData}
            setUserData={setUserData}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            setError={console.error}
          />
        } />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
