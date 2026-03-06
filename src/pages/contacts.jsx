import { Send, AtSign } from "lucide-react";

const contacts = [
  { Icon: Send,    label: "Telegram", value: "@yourusername", href: "https://t.me/yourusername" },
  { Icon: AtSign,  label: "Email",    value: "your@email.com", href: "mailto:your@email.com" },
];

function Contacts() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-zinc-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-t-2xl" />

        <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-3">Связаться с нами</p>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-8 tracking-tight">Контакты</h1>

        <div className="flex flex-col gap-3">
          {contacts.map(({ Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-4 hover:border-violet-400 dark:hover:border-violet-600 transition-colors group no-underline">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-violet-500" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-violet-500 group-hover:text-violet-400 transition-colors">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
