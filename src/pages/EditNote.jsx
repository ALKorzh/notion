import { useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { updateNote } from "../services/noteService"

function EditNote() {
  const { id } = useParams() // Получаем ID заметки из URL
  const navigate = useNavigate()
  const location = useLocation() // Используем хук useLocation для доступа к state
  const [formData, setFormData] = useState({
    title: location.state?.title || "",
    content: location.state?.content || "",
  }) // Инициализация состояния с данными, переданными через state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }) // Обновляем данные при изменении формы
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateNote(id, formData) // Отправляем обновленные данные
    navigate("/notes") // Перенаправляем на страницу со всеми заметками
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title} // Значение поля title
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content} // Значение поля content
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Note
        </button>
      </form>
    </div>
  )
}

export default EditNote
