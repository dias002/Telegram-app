import { Register, Login } from "../api/users";


function Main() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-100 to-blue-300 py-10 md:py-20 md:min-h-[80vh]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-700 drop-shadow">
        Добро пожаловать!
      </h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-600">Регистрация</h2>
          <Register />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-600">Вход</h2>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Main;