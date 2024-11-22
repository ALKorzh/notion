import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getNoteById, deleteNote } from "../services/noteService"

function ViewNote() {
  const [note, setNote] = useState(null)
  const { id } = useParams() // Retrieve the note id from the URL
  const navigate = useNavigate()

  useEffect(() => {
    const loadNote = async () => {
      try {
        const fetchedNote = await getNoteById(id)
        setNote(fetchedNote)
      } catch (error) {
        console.error(error)
        navigate("/notes") // Redirect to notes if note fetch fails
      }
    }

    loadNote()
  }, [id, navigate])

  const handleDelete = async () => {
    try {
      await deleteNote(id)
      navigate("/notes") // Navigate back to the notes list after deleting
    } catch (error) {
      console.error("Failed to delete note", error)
    }
  }

  if (!note) {
    return <p>Loading...</p> // Show loading message until the note is fetched
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-end items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/notes/${note.id}/edit`)}
            className="text-green-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </header>

      <div className="mb-4">
        <h1 className="text-xl font-bold">{note.title}</h1>
        <h2 className="text-lg font-semibold">Content</h2>
        <pre className="whitespace-pre-wrap text-gray-700">{note.content}</pre>
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate("/notes")}
          className="text-blue-500 hover:underline"
        >
          Back to Notes
        </button>
      </div>
    </div>
  )
}

export default ViewNote
