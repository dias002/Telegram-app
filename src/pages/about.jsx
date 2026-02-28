function About(){
    return(
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-200 md:py-20 md:min-h-[80vh]">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mt-10">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">О проекте</h1>
                <p className="text-gray-700 text-lg md:text-xl">
                    Этот сервис позволяет вести учет личных финансов, создавать категории расходов и доходов, а также анализировать свои траты. Интерфейс выполнен с использованием Tailwind CSS для максимального удобства и современного внешнего вида.
                </p>
            </div>
        </div>
    )
}
export default About;