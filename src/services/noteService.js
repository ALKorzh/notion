import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchNotes = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/notes`, {
      params: { authorId: userId },
    });
    return response.data;
  } catch {
    throw new Error('Failed to fetch notes');
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, noteData);
    return response.data;
  } catch {
    throw new Error('Failed to create note');
  }
};

export const updateNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${id}`, noteData);
    return response.data;
  } catch {
    throw new Error('Failed to update note');
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/notes/${id}`);
    return response.data;
  } catch {
    throw new Error('Failed to delete note');
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/notes/${id}`);
    return response.data;
  } catch {
    throw new Error('Failed to fetch note');
  }
};
