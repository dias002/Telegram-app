function Contacts(){
    return(
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-200 md:py-20 md:min-h-[80vh]">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mt-10">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Контакты</h1>
                <p className="text-gray-700 text-lg md:text-xl mb-2">Telegram: <a href="https://t.me/yourusername" className="text-blue-500 hover:underline">@yourusername</a></p>
                <p className="text-gray-700 text-lg md:text-xl">Email: <a href="mailto:your@email.com" className="text-blue-500 hover:underline">your@email.com</a></p>
            </div>
        </div>
    )
}
export default Contacts;