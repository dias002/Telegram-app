import { useState } from "react";
import { Register, Login } from "../api/users";
import { LogIn, UserPlus } from "lucide-react";

// ✅ Only uses isAuthenticated prop — no localStorage check here
// App.js already handles token verification and sets isAuthenticated correctly
function AuthModal({ isAuthenticated, onAuth }) {
  const [tab, setTab] = useState("login");

  if (isAuthenticated) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm pointer-events-auto">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl overflow-hidden">
        <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 to-indigo-500" />
        <div className="p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">FinanceApp</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-7">Войдите или создайте аккаунт для продолжения</p>

          <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl mb-7">
            {[
              { key: "login",    label: "Вход",        Icon: LogIn },
              { key: "register", label: "Регистрация", Icon: UserPlus },
            ].map(({ key, label, Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all
                  ${tab === key
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"}`}>
                <Icon size={15} />{label}
              </button>
            ))}
          </div>

          {tab === "login"
            ? <Login    onSuccess={onAuth} />
            : <Register onSuccess={onAuth} />
          }
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
