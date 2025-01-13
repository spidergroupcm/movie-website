import { useState, useEffect } from 'react';
import upcoming1 from '../../assets/up1.png';
import upcoming2 from '../../assets/up2.png';
import upcoming3 from '../../assets/up3.png';

const UpcomingMovies = () => {
    const movies = [
        { src: upcoming1, title: 'The Galactic Adventure', releaseDate: 'Releasing: Dec 25, 2024' },
        { src: upcoming2, title: 'Mystic Realms', releaseDate: 'Releasing: Jan 10, 2025' },
        { src: upcoming3, title: 'Chronicles of Time', releaseDate: 'Releasing: Feb 14, 2025' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 3000); 
        return () => clearInterval(interval);
    }, [movies.length]);

    return (
        <div className="max-w-7xl mx-auto relative overflow-hidden mb-10">
            {/* Movie Slider */}
            <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px]">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-1000 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={movie.src}
                            alt={`Upcoming Movie: ${movie.title}`}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                        {/* Movie Details */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-gradient-to-t from-black/60 via-black/40 to-transparent">
                            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{movie.title}</h2>
                            <p className="text-white text-lg md:text-xl">{movie.releaseDate}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpcomingMovies;


