import { useState, useEffect } from "react"
import {api} from './users'
import { Link } from "react-router-dom"

export function Category({ setError }) {
	const [category, setCategory] = useState([])
	const [inputValue, setInputValue] = useState("")
	
	useEffect(() => {
		getProfileCategories()
	}, [])

	const getProfileCategories = () =>{
		api.get('/finance/category/')
		.then(res => setCategory(res.data))
		.catch(err=> setError('Ошибка загрузки категорий'))
	}
	
	const handleChange = (e) => {
		setInputValue(e.target.value)
	}
	const PostCategory = async (e) => {
		e.preventDefault();
		try {
        await api.post('/finance/category/', { name: inputValue })
        	setInputValue('')
        	getProfileCategories()
		} catch(err) {
			setError('Ошибка добавления категории')
		}
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-2">
				{category.map(cat => (
					<Link key={cat.id} to={`/category/${cat.id}`}
						className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 transition text-blue-700 font-medium shadow-sm">
						{cat.name}
					</Link>
				))}
			</div>
			<form onSubmit={PostCategory} className="flex gap-2 mt-4">
				<input type="text" value={inputValue} onChange={handleChange} placeholder="Новая категория" className="input flex-1"/>
				<button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">Добавить</button>
			</form>
		</div>
	)
}


export function Income({ setError }) {
		const [income, setIncome] = useState({
			name: "",
			moneyPlus: "",
			title: ""
		});
		const [incomeget, setIncomeget] = useState([]);
		const [categories, setCategories] = useState([]);

		useEffect(() => {
			const fetchData = async () => {
				await getIncome();
				await getCategories();
			};
			fetchData();
		}, []);

		const handleChange = (e) => {
			setIncome({
				...income,
				[e.target.name]: e.target.value
			});
		};

		const getIncome = async () => {
			try {
				const getIncomedata = await api.get('/finance/income/');
				setIncomeget(getIncomedata.data);
			} catch (err) {
				setError('Ошибка загрузки доходов')
			}
		};

		const getCategories = async () => {
			try {
				const res = await api.get('/finance/category/');
				setCategories(res.data);
			} catch (err) {
				setError('Ошибка загрузки категорий')
			}
		};

		const postIncome = async (e) => {
			e.preventDefault();
			try {
				await api.post('/finance/income/', income);
				getIncome();
				setIncome({ name: '', moneyPlus: '', title: '' });
			} catch (err) {
				setError('Ошибка добавления дохода')
			}
		};

		return (
			<div className="space-y-4">
				<div className="flex flex-col gap-2">
					{incomeget.map(inc => (
						<div key={inc.id} className="flex justify-between items-center bg-green-50 rounded px-4 py-2 shadow-sm">
							<span className="font-medium text-gray-700">{inc.title}</span>
							<span className="text-green-700 font-bold">{inc.moneyPlus} тг</span>
						</div>
					))}
				</div>
				<form onSubmit={postIncome} className="flex flex-col gap-3 mt-4">
					<select name="name" value={income.name} onChange={handleChange} required className="input">
						<option value="">Выберите категорию</option>
						{categories.map(cat => (
							<option key={cat.id} value={cat.id}>{cat.name}</option>
						))}
					</select>
					<input onChange={handleChange} name="moneyPlus" value={income.moneyPlus} placeholder="Сумма" className="input"/>
					<input onChange={handleChange} name="title" value={income.title} placeholder="Описание" className="input"/>
					<button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition">Добавить доход</button>
				</form>
			</div>
		);
}