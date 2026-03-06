

function Main({ isAuthenticated }) {

  // While not authenticated, AuthModal blocks everything — this page is behind it.
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white text-center mb-3 tracking-tight leading-tight">
        Управляй <span className="text-violet-500">финансами</span>
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-base text-center font-medium max-w-sm">
        Учёт доходов, расходов и категорий — в одном месте
      </p>
    </div>
  );
}

export default Main;
