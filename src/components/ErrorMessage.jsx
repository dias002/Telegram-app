import { AlertTriangle } from "lucide-react";

function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3
      bg-zinc-900 dark:bg-zinc-800 border border-red-500/40 text-red-400
      px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold
      max-w-sm w-[calc(100vw-40px)]">
      <AlertTriangle size={16} className="flex-shrink-0" />
      <span>{typeof error === "string" ? error : "Произошла ошибка, попробуйте позже."}</span>
    </div>
  );
}

export default ErrorMessage;
