import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import MovieCard from "./MovieCard";

const AllMovies = () => {
  const movies = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">
        Stream Every Blockbuster Hit
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by movie name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No movies found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AllMovies;

