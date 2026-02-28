import { useEffect, useState } from 'react';
import { getBudgets, createBudget, getTransactions, createTransaction, getCategories, createCategory } from '../api/budget';

function BudgetPage({ setError }) {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBudget, setNewBudget] = useState({ name: '' });
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newTransaction, setNewTransaction] = useState({
    budget: '',
    category: '',
    type: 'expense',
    amount: '',
    title: ''
  });

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setBudgets(await getBudgets());
      setCategories(await getCategories());
      setTransactions(await getTransactions());
    } catch (err) {
      setError('Ошибка загрузки данных');
    }
  }

  async function handleBudgetCreate(e) {
    e.preventDefault();
    try {
      await createBudget(newBudget);
      setNewBudget({ name: '' });
      setBudgets(await getBudgets());
    } catch (err) {
      setError('Ошибка создания бюджета');
    }
  }

  async function handleCategoryCreate(e) {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      setNewCategory({ name: '' });
      setCategories(await getCategories());
    } catch (err) {
      setError('Ошибка создания категории');
    }
  }

  async function handleTransactionCreate(e) {
    e.preventDefault();

    if (!newTransaction.budget || !newTransaction.category || !newTransaction.amount) {
      setError('Заполните все обязательные поля');
      return;
    }

    const payload = {
      ...newTransaction,
        budget: parseInt(newTransaction.budget),     
        category: newTransaction.category 
          ? parseInt(newTransaction.category) 
          : null,
        amount: parseFloat(newTransaction.amount) 
    };

    try {
      await createTransaction(payload);
      setNewTransaction({ budget: '', category: '', type: 'expense', amount: '', title: '' });
      setBudgets(await getBudgets()); 
      setTransactions(await getTransactions());
    } catch (err) {
      setError('Ошибка создания транзакции');
    }
  }

  return (
    <div className="flex flex-col gap-8 p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700">Бюджеты</h1>
      <form onSubmit={handleBudgetCreate} className="flex gap-2">
        <input value={newBudget.name} onChange={e => setNewBudget({ name: e.target.value })} placeholder="Название бюджета" className="input flex-1" />
        <button className="bg-blue-600 text-white rounded px-4 py-2">Создать</button>
      </form>
      <ul className="space-y-2">
        {budgets.map(b => (
          <li key={b.id} className="bg-blue-50 rounded px-4 py-2">{b.name} (Сумма: {b.total})</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold text-blue-700">Категории</h2>
      <form onSubmit={handleCategoryCreate} className="flex gap-2">
        <input value={newCategory.name} onChange={e => setNewCategory({ name: e.target.value })} placeholder="Название категории" className="input flex-1" />
        <button className="bg-blue-600 text-white rounded px-4 py-2">Добавить</button>
      </form>
      <ul className="space-y-2">
        {categories.map(c => (
          <li key={c.id} className="bg-blue-100 rounded px-4 py-2">{c.name}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold text-blue-700">Транзакции</h2>
      <form onSubmit={handleTransactionCreate} className="flex flex-col gap-2">
        <select value={newTransaction.budget} onChange={e => setNewTransaction(t => ({ ...t, budget: e.target.value }))} className="input">
          <option value="">Выберите бюджет</option>
          {budgets.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select value={newTransaction.category} onChange={e => setNewTransaction(t => ({ ...t, category: e.target.value }))} className="input">
          <option value="">Выберите категорию</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={newTransaction.type} onChange={e => setNewTransaction(t => ({ ...t, type: e.target.value }))} className="input">
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
        <input value={newTransaction.amount} onChange={e => setNewTransaction(t => ({ ...t, amount: e.target.value }))} placeholder="Сумма" className="input" />
        <input value={newTransaction.title} onChange={e => setNewTransaction(t => ({ ...t, title: e.target.value }))} placeholder="Описание" className="input" />
        <button className="bg-blue-600 text-white rounded px-4 py-2">Добавить</button>
      </form>
      <ul className="space-y-2">
        {transactions.map(tr => (
          <li key={tr.id} className="bg-green-50 rounded px-4 py-2 flex justify-between items-center">
            <span>{tr.title} — {tr.amount}₽ ({tr.type === 'income' ? 'Доход' : 'Расход'})</span>
            <span className="text-xs text-gray-500">Категория: {categories.find(c => c.id === tr.category)?.name || '—'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetPage;
