import axios from "axios"
import bcrypt from "bcryptjs"

const API_URL = "http://localhost:5000"

// Функция для регистрации пользователя
export const registerUser = async (data) => {
  // Сначала проверяем, существует ли уже пользователь с таким email
  const checkResponse = await axios.get(`${API_URL}/users`, {
    params: { email: data.email },
  })

  if (checkResponse.data.length > 0) {
    throw new Error("Email is already registered") // Если email найден, выбрасываем ошибку
  }

  // Хэшируем пароль перед сохранением
  const hashedPassword = await bcrypt.hash(data.password, 10)

  // Регистрируем пользователя с захешированным паролем
  const response = await axios.post(`${API_URL}/users`, {
    ...data,
    password: hashedPassword,
  })

  return response.data
}

// Функция для авторизации пользователя
export const loginUser = async (email, password) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: { email },
  })

  if (response.data.length === 0) {
    throw new Error("Invalid email or password")
  }

  const user = response.data[0]

  // Проверяем введенный пароль с захешированным
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password")
  }

  return user
}
