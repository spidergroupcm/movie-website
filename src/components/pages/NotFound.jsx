import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl mt-4 font-semibold">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-lg">
          It looks like the page you’re trying to reach has been moved or never existed.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 text-lg font-semibold bg-white text-purple-600 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <img
          src="https://via.placeholder.com/400x300?text=Lost+in+Space" // Replace with your own illustration or image link
          alt="404 Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFound;
