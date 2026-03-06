import { BarChart2, Wallet, ShieldCheck } from "lucide-react";

const features = [
  { Icon: BarChart2,   text: "Наглядная аналитика по категориям" },
  { Icon: Wallet,      text: "Гибкое управление бюджетами" },
  { Icon: ShieldCheck, text: "Безопасный личный кабинет" },
];

function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-zinc-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-t-2xl" />

        <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-3">О проекте</p>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 leading-tight tracking-tight">
          Умный учёт<br />личных финансов
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
          Этот сервис позволяет вести учёт личных финансов, создавать категории расходов и доходов, а также анализировать свои траты. Интерфейс выполнен с использованием Tailwind CSS для максимального удобства и современного внешнего вида.
        </p>

        <div className="flex flex-col gap-3">
          {features.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-violet-500" />
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
