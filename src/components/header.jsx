import { Link } from "react-router-dom";

function Header(){
    return(
        <header className="shadow-md sticky top-0 z-50 bg-white/80 backdrop-blur">
            <nav className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-2 md:gap-6">
                <div className="text-2xl md:text-3xl font-bold text-blue-700 tracking-wide">FinanceApp</div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-xl">
                    <Link className="link" to='/main'>Главная</Link>
                    <Link className="link"  to='/about'>О проекте</Link>
                    <Link className="link"  to='/contacts'>Контакты</Link>
                    <Link className="link"  to='/profile'>Профиль</Link>

                </div>
            </nav>
        </header>
    )
}

export default Header;