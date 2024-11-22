import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { fetchNotes, deleteNote } from "../services/noteService"
import { useAuth } from "../contexts/AuthContext"

function Notes() {
  const [notes, setNotes] = useState([])
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const loadNotes = async () => {
      if (!user) {
        navigate("/login")
        return
      }
      const fetchedNotes = await fetchNotes(user.id)
      setNotes(fetchedNotes)
    }
    loadNotes()
  }, [user, navigate])

  const handleDelete = async (id) => {
    await deleteNote(id)
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Hello, {user?.email || "Guest"}</h1>
        <nav className="flex space-x-4">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-blue-500" : "text-gray-700"
            } hover:underline`}
          >
            Home
          </Link>
          <Link
            to="/notes"
            className={`${
              location.pathname === "/notes" ? "text-blue-500" : "text-gray-700"
            } hover:underline`}
          >
            Notes
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline"
          >
            Log Out
          </button>
        </nav>
      </header>

      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      <Link
        to="/notes/new"
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
      >
        Create New Note
      </Link>
      {notes.length > 0 ? (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600">
                {note.content.substring(0, 100)}...
              </p>
              <div className="mt-4 flex space-x-2">
                <Link to={`/notes/${note.id}`} className="text-blue-500">
                  View
                </Link>
                <Link to={`/notes/${note.id}/edit`} className="text-green-500">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No notes found. Create a new one!</p>
      )}
    </div>
  )
}

export default Notes
