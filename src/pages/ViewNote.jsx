import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchNotes } from "../services/noteService"

function ViewNote() {
  const { id } = useParams()
  const [note, setNote] = useState(null)

  useEffect(() => {
    const loadNote = async () => {
      const notes = await fetchNotes()
      const foundNote = notes.find((n) => n.id === parseInt(id))
      setNote(foundNote)
    }
    loadNote()
  }, [id])

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      {note ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
          <p className="text-gray-600 mb-4">{note.content}</p>
          <Link to="/notes" className="text-blue-500">
            Back to Notes
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ViewNote
