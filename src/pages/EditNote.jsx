import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { updateNote, getNoteById } from "../services/noteService" // Импорт функции getNoteById

function EditNote() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  // Инициализация данных формы (через state или загрузка с сервера)
  useEffect(() => {
    const fetchNote = async () => {
      if (!location.state) {
        // Если данные не переданы через state, загружаем с сервера
        const note = await getNoteById(id)
        setFormData({
          title: note.title || "",
          content: note.content || "",
        })
      } else {
        // Если данные переданы через state
        setFormData({
          title: location.state.title || "",
          content: location.state.content || "",
        })
      }
    }
    fetchNote()
  }, [id, location.state])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateNote(id, formData)
    navigate("/notes")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Note</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 py-1 px-3 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </header>

      <div className="bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:ring focus:ring-blue-200"
              rows="6"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditNote
