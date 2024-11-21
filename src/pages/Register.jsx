import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validatePassword = (password) => {
    // Регулярное выражение для проверки пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one number."
      )
      return
    }

    setIsLoading(true)

    try {
      // Попробуем зарегистрировать пользователя
      const user = await registerUser({
        email: formData.email,
        password: formData.password,
      })
      login(user)
      navigate("/notes")
    } catch (err) {
      // Обрабатываем ошибку при регистрации (например, если email уже существует)
      if (err.message === "Email is already registered") {
        setError("This email is already registered")
      } else {
        setError("Registration failed. Please try again.")
      }
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mb-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login here
            </Link>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
