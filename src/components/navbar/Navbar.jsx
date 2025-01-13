import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, setUser, logoutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu
  const location = useLocation(); // Hook to detect route changes

  useEffect(() => {
    // Close menu on route change
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add(
        "dark:bg-gray-900",
        "dark:text-white",
        "transition-all",
        "duration-500"
      );
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove(
        "dark:bg-gray-900",
        "dark:text-white",
        "transition-all",
        "duration-500"
      );
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto px-4 flex justify-between items-center bg-yellow-400 py-3 dark:bg-gray-800 shadow-lg">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center">
          <img
            className="w-10 h-10 filter dark:brightness-75"
            src={logo}
            alt="Logo"
          />
          <h1 className="text-2xl font-bold text-gray-800 ml-3 dark:text-white">
            Movie Flix
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-red-600 font-medium transition dark:text-gray-300 dark:hover:text-red-400"
          >
            Home
          </Link>
          <Link
            to="/all-movies"
            className="text-gray-600 hover:text-red-600 font-medium transition dark:text-gray-300 dark:hover:text-red-400"
          >
            All Movies
          </Link>
          <Link
            to="/add-movie"
            className="text-gray-600 hover:text-red-600 font-medium transition dark:text-gray-300 dark:hover:text-red-400"
          >
            Add Movie
          </Link>
          <Link
            to="/favorites"
            className="text-gray-600 hover:text-red-600 font-medium transition dark:text-gray-300 dark:hover:text-red-400"
          >
            My Favorites
          </Link>
          <Link
            to="/upcoming"
            className="text-gray-600 hover:text-red-600 font-medium transition dark:text-gray-300 dark:hover:text-red-400"
          >
            Upcoming
          </Link>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          {user && (
            <img
              className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="User"
            />
          )}
          {!user && (
            <Link
              to="/auth/register"
              className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              Register
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white shadow-lg py-2 px-4 dark:bg-gray-800">
        <details
          className="relative"
          open={menuOpen}
          onToggle={(e) => setMenuOpen(e.target.open)}
        >
          <summary className="cursor-pointer text-center text-gray-600 font-medium dark:text-gray-300">
            Menu
          </summary>
          <div className="mt-2 space-y-2">
            <Link
              to="/"
              className="block text-gray-600 hover:text-red-600 transition dark:text-gray-300 dark:hover:text-red-400"
            >
              Home
            </Link>
            <Link
              to="/all-movies"
              className="block text-gray-600 hover:text-red-600 transition dark:text-gray-300 dark:hover:text-red-400"
            >
              All Movies
            </Link>
            <Link
              to="/add-movie"
              className="block text-gray-600 hover:text-red-600 transition dark:text-gray-300 dark:hover:text-red-400"
            >
              Add Movie
            </Link>
            <Link
              to="/favorites"
              className="block text-gray-600 hover:text-red-600 transition dark:text-gray-300 dark:hover:text-red-400"
            >
              My Favorites
            </Link>
            <Link
              to="/upcoming"
              className="block text-gray-600 hover:text-red-600 transition dark:text-gray-300 dark:hover:text-red-400"
            >
              Upcoming
            </Link>
          </div>
        </details>
      </div>
    </div>
  );
};

export default Navbar;

