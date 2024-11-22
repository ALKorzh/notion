import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../services/noteService';
import { useAuth } from '../contexts/AuthContext';

function CreateNote() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    await createNote({ ...formData, authorId: user.id });
    navigate('/notes');
  };

  const handleBack = () => {
    navigate('/notes');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Note</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Back
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
