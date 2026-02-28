import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from './../api/users'

function CategoryPage({ setError }){
    const {id} = useParams()
    const [category, setCategory] = useState(null)
    const [expences, setExpence] = useState([])
    const [value, setValue] = useState({
		moneySpent:"",
		title:""
    })
    const change = (e) =>{
		setValue({
			...value,
			[e.target.name]:e.target.value
		})
	}
    const postExpence = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await api.post('finance/expense/', {
                moneySpent: value.moneySpent,
                title: value.title,
                name: id,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            const expRes = await api.get(`finance/expense/?category=${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setExpence(expRes.data);
            setValue({ moneySpent: '', title: '' });
        } catch (err) {
            setError('Ошибка добавления расхода')
        }
    }
    useEffect(() => {
    async function FetchPage() {
        try {
            const token = localStorage.getItem('token')
            const expRes = await api.get(`finance/expense/?category=${id}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
            setExpence(expRes.data)
            const res = await api.get(`finance/category/${id}`,{
                headers:{
                    Authorization: `Token ${token}`
                }
            }
                )
            setCategory(res.data)
        } catch (err) {
            setError('Ошибка загрузки категории')
        }
    }
    FetchPage()
}, [id])

if (!category) return <p>Что то пошло не так...</p>
    return (
        <div className="flex flex-col items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-200 py-10 md:py-20 md:min-h-[80vh]">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-2">Категория: {category?.name || '...'}</h2>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">Траты</h3>
                <div className="space-y-2 mb-6">
                    {expences.length === 0 && <p className="text-gray-500">Нет трат по этой категории</p>}
                    {expences.map(exp=>(
                        <div key={exp.id} className="flex justify-between items-center bg-blue-50 rounded px-4 py-2 shadow-sm">
                            <span className="font-medium text-gray-700">{exp.title}</span>
                            <span className="text-blue-700 font-bold">{exp.moneySpent} ₽</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={postExpence} className="flex flex-col gap-4">
                    <input type="text" name="moneySpent" value={value.moneySpent} onChange={change} placeholder="Сумма" className="input" />
                    <input type="text" name="title" value={value.title} onChange={change} placeholder="Описание" className="input" />
                    <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">Добавить расход</button>
                </form>
            </div>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-2">Расходы</h3>
                <ul className="space-y-2">
                    {expences.map(exp => (
                        <li key={exp.id} className="bg-red-50 rounded px-4 py-2 shadow-sm flex justify-between items-center">
                            <span>{exp.title} — {exp.moneySpent}₽</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default CategoryPage;