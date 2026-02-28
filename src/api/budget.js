import { api } from './users';

export async function getBudgets() {
  const res = await api.get('/finance/budget/');
  return res.data;
}

export async function createBudget(data) {
  const res = await api.post('/finance/budget/', data);
  return res.data;
}

export async function getTransactions(params = {}) {
  const res = await api.get('/finance/transaction/', { params });
  return res.data;
}

export async function createTransaction(data) {
  const res = await api.post('/finance/transaction/', data);
  return res.data;
}

export async function getCategories() {
  const res = await api.get('/finance/category/');
  return res.data;
}

export async function createCategory(data) {
  const res = await api.post('/finance/category/', data);
  return res.data;
}


export async function PieData(){
    const data = await api.get("/finance/transaction/", );
    return data.data;
}
