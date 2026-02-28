import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Регистрация пользователя
export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!form.username || !form.email || !form.password || !form.password2) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
    if (form.password !== form.password2) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      const loginResponse = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
          username: form.username,
          password: form.password,
        }
      );
      localStorage.setItem("token", loginResponse.data.access);
      navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : JSON.stringify(err.response.data)
        );
      } else {
        setError("Ошибка регистрации");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg py-8 flex flex-col items-center bg-blue-100 gap-3 mx-auto my-3 shadow-lg"
      >
        <input
          className="input w-full"
          name="username"
          placeholder="Имя пользователя"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="input w-full"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="input w-full"
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="input w-full"
          type="password"
          name="password2"
          placeholder="Повторите пароль"
          value={form.password2}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition w-full">Зарегистрироваться</button>
        {error && (
          <div className="text-red-600 mt-2 text-center w-full">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

// Логин пользователя
export function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Введите имя пользователя и пароль");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        form
      );
      localStorage.setItem("token", response.data.access);
      navigate("/profile");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg py-8 flex flex-col items-center bg-blue-50 gap-3 mx-auto my-3 shadow-lg">
        <input
          className="input w-full"
          name="username"
          placeholder="Имя пользователя"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="input w-full"
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition w-full">Войти</button>
        {error && (
          <div className="text-red-600 mt-2 text-center w-full">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

// Настройка axios с токеном
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/api/profile/")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      {user && user.username ? (
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Профиль</h1>
          <p className="text-gray-700 text-lg">Имя пользователя: <span className="font-semibold">{user.username}</span></p>
          <p className="text-gray-700 text-lg">Email: <span className="font-semibold">{user.email}</span></p>
          <button onClick={logout} className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition mt-2">Выйти</button>
        </div>
      ) : (
        <p className="text-gray-500">Вы не авторизованы</p>
      )}
    </div>
  );
}
