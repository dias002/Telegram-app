import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Mail } from "lucide-react";

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputCls = `w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm
  bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white
  placeholder:text-zinc-400 dark:placeholder:text-zinc-500
  focus:bg-white dark:focus:bg-zinc-900 focus:border-violet-500 outline-none transition`;

const btnCls = `w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800
  text-white font-semibold text-sm py-2.5 rounded-xl transition-colors`;

// ── Axios instance (shared) ───────────────────────────────────────────────────
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Register ──────────────────────────────────────────────────────────────────
export function Register({ onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.password2) {
      setError("Пожалуйста, заполните все поля."); return;
    }
    if (form.password !== form.password2) {
      setError("Пароли не совпадают"); return;
    }
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      const loginRes = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("token", loginRes.data.access);

      // ✅ onSuccess triggers App.handleAuth which fetches profile & closes modal
      if (onSuccess) await onSuccess();
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data
          ? (typeof err.response.data === "string" ? err.response.data : JSON.stringify(err.response.data))
          : "Ошибка регистрации"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input className={inputCls} name="username" placeholder="Имя пользователя"
        value={form.username} onChange={handleChange} required />
      <input className={inputCls} name="email" type="email" placeholder="Email"
        value={form.email} onChange={handleChange} required />
      <input className={inputCls} name="password" type="password" placeholder="Пароль"
        value={form.password} onChange={handleChange} required />
      <input className={inputCls} name="password2" type="password" placeholder="Повторите пароль"
        value={form.password2} onChange={handleChange} required />
      <button type="submit" className={btnCls} disabled={loading}>
        {loading ? "Загрузка..." : "Зарегистрироваться"}
      </button>
      {error && <p className="text-red-500 dark:text-red-400 text-xs text-center mt-1">{error}</p>}
    </form>
  );
}

// ── Login ─────────────────────────────────────────────────────────────────────
export function Login({ onSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Введите имя пользователя и пароль"); return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", form);
      localStorage.setItem("token", res.data.access);

      // ✅ onSuccess triggers App.handleAuth which fetches profile & closes modal
      if (onSuccess) await onSuccess();
      navigate("/profile");
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input className={inputCls} name="username" placeholder="Имя пользователя"
        value={form.username} onChange={handleChange} required />
      <input className={inputCls} name="password" type="password" placeholder="Пароль"
        value={form.password} onChange={handleChange} required />
      <button type="submit" className={btnCls} disabled={loading}>
        {loading ? "Загрузка..." : "Войти"}
      </button>
      {error && <p className="text-red-500 dark:text-red-400 text-xs text-center mt-1">{error}</p>}
    </form>
  );
}

// ── ProfilePage ───────────────────────────────────────────────────────────────
// Receives user data from App.js via props — no need to fetch again
export function ProfilePage({ userData, isAuthenticated, onLogout }) {

  if (!isAuthenticated) {
    return <p className="text-sm text-zinc-400 dark:text-zinc-500">Вы не авторизованы</p>;
  }

  // Still loading user data
  if (!userData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 pb-5 border-b border-zinc-200 dark:border-zinc-700">
        <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center">
          <User size={28} className="text-violet-500" />
        </div>
        <div className="text-center">
          <p className="font-bold text-zinc-900 dark:text-white text-base leading-tight">{userData.username}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{userData.email}</p>
        </div>
      </div>

      {/* Info rows */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl px-4 py-3">
          <User size={15} className="text-zinc-400 flex-shrink-0" />
          <div>
            <p style={{fontSize:"10px"}} className="text-zinc-400 dark:text-zinc-500 mb-0.5 font-bold uppercase tracking-wider">Пользователь</p>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{userData.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl px-4 py-3">
          <Mail size={15} className="text-zinc-400 flex-shrink-0" />
          <div>
            <p style={{fontSize:"10px"}} className="text-zinc-400 dark:text-zinc-500 mb-0.5 font-bold uppercase tracking-wider">Email</p>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Logout — uses onLogout from App so state is reset properly */}
      <button onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800
          hover:bg-red-50 dark:hover:bg-red-950 border border-zinc-200 dark:border-zinc-700
          hover:border-red-300 dark:hover:border-red-800 text-zinc-600 dark:text-zinc-400
          hover:text-red-500 dark:hover:text-red-400 font-semibold text-sm py-2.5 rounded-xl transition-colors">
        <LogOut size={15} />
        Выйти
      </button>
    </div>
  );
}
