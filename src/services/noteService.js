import axios from "axios"

const API_URL = "http://localhost:5000"

export const fetchNotes = async (userId) => {
  const response = await axios.get(`${API_URL}/notes`, {
    params: { authorId: userId },
  })
  return response.data
}

export const createNote = async (noteData) => {
  const response = await axios.post(`${API_URL}/notes`, noteData)
  return response.data
}

export const updateNote = async (id, noteData) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, noteData)
  return response.data
}

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/notes/${id}`)
  return response.data
}
