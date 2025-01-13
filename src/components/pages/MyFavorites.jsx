import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a movie from favorites
  const handleRemoveFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie._id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-7xl h-screen mx-auto">
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-center">Favourite Movies</h1>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorite movies yet.</p>
        ) : (
          favorites.map((movie) => (
            <div key={movie._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                className="w-full h-[300px] object-cover rounded-lg"
                src={movie.photo}
                alt={movie.title}
              />
              <h2 className="text-xl font-semibold mt-4">{movie.title}</h2>
              <p className="text-gray-500">{movie.genre}</p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/movie-details/${movie._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveFromFavorites(movie._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyFavorites;

