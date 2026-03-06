import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Plus, FolderPlus, ArrowUpCircle, ArrowDownCircle, Tag, Layers } from "lucide-react";
import {
  getBudgets, createBudget, getTransactions, createTransaction,
  getCategories, createCategory, getExpenseStats,
} from "../api/budget";

// Dark-friendly, saturated palette — no light/pastel colors
const DARK_COLORS  = ["#7c3aed","#4f46e5","#0ea5e9","#06b6d4","#8b5cf6","#3b82f6"];
const LIGHT_COLORS = ["#34008d","#1a0ff0","#0477ac","#15879c","#5f42a3","#196ef6"];

function BudgetPage({ setError, budgetId }) {
  const [budgets,       setBudgets]       = useState([]);
  const [transactions,  setTransactions]  = useState([]);
  const [categories,    setCategories]    = useState([]);
  const [stats,         setStats]         = useState([]);
  const [newBudget,     setNewBudget]     = useState({ name: "" });
  const [newCategory,   setNewCategory]   = useState({ name: "" });
  const [newTransaction, setNewTransaction] = useState({
    budget: "", category: "", type: "expense", amount: "", title: "",
  });

  const isDark = document.documentElement.classList.contains("dark");

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    try {
      setBudgets(await getBudgets());
      setStats(await getExpenseStats(budgetId));
      setCategories(await getCategories());
      setTransactions(await getTransactions());
    } catch { setError("Ошибка загрузки данных"); }
  }

  async function handleBudgetCreate(e) {
    e.preventDefault();
    try { await createBudget(newBudget); setNewBudget({ name: "" }); setBudgets(await getBudgets()); }
    catch { setError("Ошибка создания бюджета"); }
  }

  async function handleCategoryCreate(e) {
    e.preventDefault();
    try { await createCategory(newCategory); setNewCategory({ name: "" }); setCategories(await getCategories()); }
    catch { setError("Ошибка создания категории"); }
  }

  async function handleTransactionCreate(e) {
    e.preventDefault();
    if (!newTransaction.budget || !newTransaction.category || !newTransaction.amount) {
      setError("Заполните все обязательные поля"); return;
    }
    const payload = {
      ...newTransaction,
      budget:   parseInt(newTransaction.budget),
      category: newTransaction.category ? parseInt(newTransaction.category) : null,
      amount:   parseFloat(newTransaction.amount),
    };
    try {
      await createTransaction(payload);
      setNewTransaction({ budget: "", category: "", type: "expense", amount: "", title: "" });
      setBudgets(await getBudgets());
      setTransactions(await getTransactions());
      setStats(await getExpenseStats());
    } catch { setError("Ошибка создания транзакции"); }
  }

  const input = `w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-sm
    bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white
    focus:bg-white dark:focus:bg-zinc-750 focus:border-violet-500 outline-none transition`;

  const sectionTitle = (Icon, text, count) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950 flex items-center justify-center">
        <Icon size={14} className="text-violet-500" />
      </div>
      <h2 className="text-base font-bold text-zinc-900 dark:text-white">{text}</h2>
      {count !== undefined && (
        <span className="text-xs font-bold bg-violet-50 dark:bg-violet-950 text-violet-500 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-8">

      {/* Budgets */}
      <section>
        {sectionTitle(Layers, "Бюджеты", budgets.length)}
        <form onSubmit={handleBudgetCreate} className="flex gap-2 mb-4">
          <input value={newBudget.name} onChange={e => setNewBudget({ name: e.target.value })}
            placeholder="Название бюджета" className={input} />
          <button type="submit"
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap">
            <Plus size={15} /> Создать
          </button>
        </form>
        <div className="flex flex-col gap-2">
          {budgets.map(b => (
            <div key={b.id} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{b.name}</span>
              <span className="font-bold text-violet-500">₸ {Number(b.total).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* Categories */}
      <section>
        {sectionTitle(Tag, "Категории", categories.length)}
        <form onSubmit={handleCategoryCreate} className="flex gap-2 mb-4">
          <input value={newCategory.name} onChange={e => setNewCategory({ name: e.target.value })}
            placeholder="Название категории" className={input} />
          <button type="submit"
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap">
            <FolderPlus size={15} /> Добавить
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <span key={c.id} className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-800">
              <Tag size={11} /> {c.name}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* Add transaction */}
      <section>
        {sectionTitle(Plus, "Новая транзакция")}
        <form onSubmit={handleTransactionCreate} className="flex flex-col gap-3">
          <select value={newTransaction.budget}
            onChange={e => setNewTransaction(t => ({ ...t, budget: e.target.value }))} className={input}>
            <option value="">Выберите бюджет</option>
            {budgets.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <select value={newTransaction.category}
            onChange={e => setNewTransaction(t => ({ ...t, category: e.target.value }))} className={input}>
            <option value="">Выберите категорию</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {/* Type toggle */}
          <div className="flex gap-2">
            {[
              { val: "income",  label: "Доход",  Icon: ArrowUpCircle,   activeClass: "border-emerald-500 bg-emerald-950 text-emerald-400" },
              { val: "expense", label: "Расход", Icon: ArrowDownCircle, activeClass: "border-red-500 bg-red-950 text-red-400" },
            ].map(({ val, label, Icon, activeClass }) => (
              <button type="button" key={val}
                onClick={() => setNewTransaction(t => ({ ...t, type: val }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all
                  ${newTransaction.type === val
                    ? activeClass
                    : "border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-400"}`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <input value={newTransaction.amount}
            onChange={e => setNewTransaction(t => ({ ...t, amount: e.target.value }))}
            placeholder="Сумма (₸)" type="number" className={input} />
          <input value={newTransaction.title}
            onChange={e => setNewTransaction(t => ({ ...t, title: e.target.value }))}
            placeholder="Описание" className={input} />
          <button type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition text-sm">
            Добавить транзакцию
          </button>
        </form>
      </section>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* Transaction history */}
      <section>
        {sectionTitle(Layers, "История", transactions.length)}
        <div className="flex flex-col gap-2">
          {transactions.map(tr => (
            <div key={tr.id}
              className="flex items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                  ${tr.type === "income" ? "bg-emerald-950" : "bg-red-950"}`}>
                  {tr.type === "income"
                    ? <ArrowUpCircle size={18} className="text-emerald-400" />
                    : <ArrowDownCircle size={18} className="text-red-400" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{tr.title || "—"}</p>
                  <p className="text-xs text-zinc-400">{categories.find(c => c.id === tr.category)?.name || "—"}</p>
                </div>
              </div>
              <span className={`text-sm font-bold ${tr.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                {tr.type === "income" ? "+" : "-"}{Number(tr.amount).toLocaleString()} ₸
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pie chart */}
      {stats.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950 flex items-center justify-center">
              <Layers size={14} className="text-violet-500" />
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">Расходы по категориям</h2>
          </div>
          <div className="max-w-xs mx-auto">
            <Pie
              data={{
                labels: stats.map(i => i.category__name),
                datasets: [{
                  label: "Расходы",
                  data: stats.map(i => i.total),
                  backgroundColor: isDark ? DARK_COLORS : LIGHT_COLORS,
                  borderColor: isDark ? "#18181b" : "#fff",
                  borderWidth: 2,
                }],
              }}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: isDark ? "#a1a1aa" : "#52525b",
                      font: { size: 12 },
                      padding: 16,
                    },
                  },
                },
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default BudgetPage;
