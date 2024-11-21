import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Если пользователь не авторизован, отображаем кнопки для логина и регистрации
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
          <p className="mb-4 text-gray-700">You are not logged in.</p>

          <div className="flex justify-center gap-4">
            {/* Кнопка для перехода к логину */}
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Go to Login
            </button>

            {/* Кнопка для перехода к регистрации */}
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Go to Register
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Если пользователь авторизован, отображаем приветствие
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>
        <p className="text-gray-700 mb-4">You are logged in.</p>
      </div>
    </div>
  )
}

export default Home
