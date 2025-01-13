import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';

const Home = () => {
  const movies = useLoaderData(); 
  const navigate = useNavigate();

  // Make sure movies is an array and contains the data you expect
  const topRatedMovies = Array.isArray(movies) 
    ? movies.sort((a, b) => b.rating - a.rating).slice(0, 6)
    : [];

  const banners = [
    { img: banner1, title: 'Experience the Thrill', subtitle: 'Catch the latest blockbusters now!' },
    { img: banner2, title: 'Your Favorite Classics', subtitle: 'Revisit timeless masterpieces' },
    { img: banner3, title: 'Award Winners', subtitle: 'Explore award-winning films from around the world' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="max-w-7xl mx-auto rounded-lg shadow-lg">
      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="relative flex w-full h-[500px] transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <img
                src={banner.img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-10">
                <h1 className="text-4xl font-bold text-white">{banner.title}</h1>
                <p className="text-lg text-gray-300 mt-2">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none"
        >
          &rarr;
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mt-12 mb-6">Featured Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {topRatedMovies.length > 0 ? (
          topRatedMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 dark:bg-gray-800"
            >
              <img
                src={movie.photo}
                alt={movie.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold dark:text-white">{movie.title}</h3>
              <p className="dark:text-gray-300">Genre: {movie.genre}</p>
              <p className="dark:text-gray-300">Duration: {movie.duration} mins</p>
              <p className="dark:text-gray-300">Release Year: {movie.releaseYear}</p>
              <p className="dark:text-gray-300">Rating: ⭐ {movie.rating}</p>
              <button
                onClick={() => navigate(`/movie-details/${movie._id}`)}
                className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
              >
                See Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No featured movies available</p>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate('/all-movies')}
          className="bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
        >
          See All Movies
        </button>
      </div>

      <div className="mt-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.length > 0 ? (
            movies.slice(-6).map((movie) => (
              <div key={movie._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800">
                <img src={movie.photo} alt={movie.title} className="w-full h-56 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold dark:text-white">{movie.title}</h3>
                <p className="dark:text-gray-300">Genre: {movie.genre}</p>
                <p className="dark:text-gray-300">Release Year: {movie.releaseYear}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No new arrivals available</p>
          )}
        </div>
      </div>

    
     {/* Reviews Section */}
     <div className="mt-16 px-4">
  <h2 className="text-2xl font-bold mb-6 text-center text-white bg-gray-100 dark:bg-gray-800">User Reviews</h2>
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
    <p className="text-lg italic text-black dark:text-white">"Amazing movie collection! Highly recommended for movie buffs."</p>
    <p className="text-right font-semibold text-black dark:text-white">- John Doe</p>
  </div>
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
    <p className="text-lg italic text-black dark:text-white">"An incredible variety of genres. I found some hidden gems!"</p>
    <p className="text-right font-semibold text-black dark:text-white">- Jane Smith</p>
  </div>
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
    <p className="text-lg italic text-black dark:text-white">"A fantastic streaming service with great recommendations based on my interests."</p>
    <p className="text-right font-semibold text-black dark:text-white">- Mark Johnson</p>
  </div>
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
    <p className="text-lg italic text-black dark:text-white">"Best place to watch both new releases and old classics. Love the collection!"</p>
    <p className="text-right font-semibold text-black dark:text-white">- Emily Davis</p>
  </div>
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
    <p className="text-lg italic text-black dark:text-white">"I’ve been a member for months, and I’m still amazed at how great the movies are."</p>
    <p className="text-right font-semibold text-black dark:text-white">- Michael Brown</p>
  </div>
</div>


      {/* Membership Section */}
      <div className="mt-16 mb-10 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Become a Member</h2>
        <div className="text-center">
          <p className="mb-4 ">Get exclusive access to premium content and early releases.</p>
          <button className="bg-purple-600 text-white py-2 px-6 mb-10 rounded-lg shadow-md hover:bg-purple-700">
            Join Now
          </button>
        </div>
      </div> 

 
    </div> 
  );
};

export default Home;

