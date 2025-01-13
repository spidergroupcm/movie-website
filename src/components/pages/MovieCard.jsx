import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { _id, photo, title, genre, duration, rating, releaseYear } = movie;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img className="h-64 w-full object-cover" src={photo} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {genre} | {duration} min | {rating}⭐
        </p>
        <p className="text-sm text-gray-400 mt-1">Released: {releaseYear}</p>
        <div className="mt-4">
          {/* Navigate to the correct MovieDetails route */}
          <Link
            to={`/movie-details/${_id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-center block"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;


