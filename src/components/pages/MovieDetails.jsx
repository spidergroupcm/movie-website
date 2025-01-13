
import Swal from 'sweetalert2';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { FaFilm, FaClock, FaStar, FaCalendarAlt } from 'react-icons/fa';

const MovieDetails = () => {
  const movie = useLoaderData(); // Fetch movie data using loader
  const navigate = useNavigate();

  if (!movie) {
    return <p className="text-gray-700 text-center">Loading movie details...</p>;
  }

  const { _id, title, photo, genre, duration, rating, releaseYear, summary } = movie;

  // Handle movie deletion
  const handleDelete = (movieId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-server-gules.vercel.app/movie/${movieId}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: 'Deleted!',
                text: 'The movie has been deleted.',
                icon: 'success',
              });
              // Navigate back to movie list and ensure smooth update
              navigate('/all-movies', { replace: true });
            }
          })
          .catch((err) => {
            console.error('Error deleting movie:', err);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the movie. Please try again.',
              icon: 'error',
            });
          });
      }
    });
  };

  // Handle adding movie to favorites
  const handleAddToFavourite = () => {
    // Store the movie in localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    storedFavorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
  
    Swal.fire({
      title: "Added to Favourites!",
      text: `Movie "${title}" has been added to your favorites.`,
      icon: "success",
    });
  };
  


  // const handleAddToFavourite = () => {
  //   console.log(`Adding movie with ID: ${_id} to favorites.`);
  //   Swal.fire({
  //     title: 'Added to Favourites!',
  //     text: `Movie "${title}" has been added to your favorites.`,
  //     icon: 'success',
  //   });
  // };

  // Handle movie update
  const handleUpdateMovie = () => {
    console.log(`Updating movie with ID: ${_id}`);
    Swal.fire({
      title: 'Feature Coming Soon!',
      text: `The update feature for "${title}" is under construction.`,
      icon: 'info',
    });
  };

  return (



<div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
  

  <div className="flex flex-col lg:flex-row justify-center items-center md:gap-14">
    <div className="flex-shrink-0">
      <img
        className="w-full h-[450px] max-w-md mx-auto mb-6 rounded-lg shadow-xl transition-transform transform hover:scale-105"
        src={photo}
        alt={title || 'Movie Poster'}
      />
    </div>

    <div className="text-center lg:text-left">
      <div className="space-y-6 mb-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center md:text-left  text-black">{title || 'Untitled Movie'}</h1>
        <div className="flex items-center gap-2 text-black text-3xl ">
          <FaFilm className="text-red-500 text-3xl" />
          <span className="font-semibold"></span> {genre || 'N/A'}
        </div>
        <div className="flex items-center gap-2 text-black text-3xl ">
          <FaClock className="text-blue-800 text-3xl" />
          <span className="font-semibold"></span> {duration || 'N/A'} min
        </div>
        <div className="flex items-center gap-2 text-black text-3xl ">
          <FaStar className="text-yellow-500 text-3xl " />
          <span className="font-semibold"></span> {rating || 'N/A'}
        </div>
        <div className="flex items-center gap-2 text-black text-3xl ">
          <FaCalendarAlt className="text-black text-3xl" />
          <span className="font-semibold"></span> {releaseYear || 'N/A'}
        </div>
        <div className="flex items-center gap-2 text-black text-2xl ">
          <span className="font-semibold "></span> {summary || 'No summary available.'}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => handleDelete(_id)}
          className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg transition-all transform hover:scale-105"
        >
          Delete Movie
        </button>
        <button
          onClick={handleAddToFavourite}
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-lg transition-all transform hover:scale-105"
        >
          Add to Favourite
        </button>

        <Link
          to={`/auth/update-movie/${_id}`}
          className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-lg transition-all transform hover:scale-105"
        >
          Update Movie
        </Link>
      </div>
    </div>
  </div>
</div>


  );
};

export default MovieDetails;

