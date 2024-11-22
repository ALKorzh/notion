import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-8xl font-extrabold text-red-500">404</h1>
      <p className="mt-4 text-2xl text-gray-700">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
