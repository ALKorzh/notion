import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNote } from "../services/noteService"
import { useAuth } from "../contexts/AuthContext"

function CreateNote() {
  const [formData, setFormData] = useState({ title: "", content: "" })
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate("/login")
      return
    }
    await createNote({ ...formData, authorId: user.id })
    navigate("/notes")
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Note
        </button>
      </form>
    </div>
  )
}

export default CreateNote
