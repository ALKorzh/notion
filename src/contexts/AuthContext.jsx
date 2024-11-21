import { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

// Создаем контекст для авторизации
const AuthContext = createContext()

// Хук для использования контекста
export const useAuth = () => {
  return useContext(AuthContext)
}

// Компонент-поставщик контекста
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Пропс children обязателен
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Экспортируем AuthProvider как default
export default AuthProvider

// Также экспортируем AuthContext по имени (если нужно)
export { AuthContext }
