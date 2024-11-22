import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Hello, {user?.email || 'Guest'}</h1>
        <nav className="flex space-x-4">
          <Link
            to="/"
            className={`${
              location.pathname === '/' ? 'text-blue-500' : 'text-gray-700'
            } hover:underline`}
          >
            Home
          </Link>
          <Link
            to="/notes"
            className={`${
              location.pathname === '/notes' ? 'text-blue-500' : 'text-gray-700'
            } hover:underline`}
          >
            Notes
          </Link>
          {user && (
            <button onClick={handleLogout} className="text-red-500 hover:underline">
              Log Out
            </button>
          )}
        </nav>
      </header>

      <main className="bg-white p-6 rounded shadow text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}!</h1>
            <p className="text-gray-700 mb-4">
              You are logged in. Navigate to your notes or explore other sections.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/notes" className="bg-blue-500 text-white py-2 px-4 rounded">
                Go to Notes
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
            <p className="text-gray-700 mb-4">Please log in to continue.</p>
            <div className="flex justify-center space-x-4">
              <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">
                Log In
              </Link>
              <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded">
                Register
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;
