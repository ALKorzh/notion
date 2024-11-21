import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notes from "./pages/Notes"
import CreateNote from "./pages/CreateNote"
import EditNote from "./pages/EditNote"
import ViewNote from "./pages/ViewNote"
import NotFound from "./pages/NotFound"
import AuthProvider from "./contexts/AuthContext.jsx"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/new" element={<CreateNote />} />
          <Route path="/notes/:id/edit" element={<EditNote />} />
          <Route path="/notes/:id" element={<ViewNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
