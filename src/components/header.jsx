import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, LayoutDashboard, Info, Mail, User } from "lucide-react";
import { useTheme } from "../components/ThemeContext";

const links = [
  { to: "/main",     label: "Главная",   Icon: LayoutDashboard },
  { to: "/about",    label: "О проекте", Icon: Info },
  { to: "/contacts", label: "Контакты",  Icon: Mail },
  { to: "/profile",  label: "Профиль",   Icon: User },
];

function Header() {
  const location = useLocation();
  const { dark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/main" className="font-extrabold text-lg tracking-tight text-zinc-900 dark:text-white">
          Finance<span className="text-violet-500">App</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ to, label, Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"}`}>
                <Icon size={15} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
          <button onClick={toggle}
            className="ml-2 p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
