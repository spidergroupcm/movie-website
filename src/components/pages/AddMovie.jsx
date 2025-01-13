import { useState } from "react";
import Swal from "sweetalert2";

const AddMovie = () => {
  const [releaseYear, setReleaseYear] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleAddMovie = async (e) => {
    e.preventDefault();

    const form = e.target;
    const photo = form.photo.value;
    const title = form.title.value;
    const genre = form.genre.value;
    const duration = form.duration.value;
    const rating = form.rating.value;
    const summary = form.summary.value;
    const releaseYear = form.releaseYear.value;

    // Validation logic
    if (!releaseYear) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Release Year is required.",
      });
      return;
    }
    if (!rating || rating < 1 || rating > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Rating",
        text: "Please provide a valid rating between 1 and 10.",
      });
      return;
    }
    if (!summary) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Summary is required.",
      });
      return;
    }

    const newMovie = {
      photo,
      title,
      genre,
      duration,
      rating,
      summary,
      releaseYear,
    };

    try {
      const response = await fetch("https://movie-server-gules.vercel.app/addmovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to the server.");
      }

      const data = await response.json();

      if (data.insertedID || data.insertedId) { // Handling both possible keys
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Movie added successfully.",
        });
        form.reset(); // Reset the form
        setReleaseYear("");
        setDuration("");
        setRating("");
        setSummary("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add the movie. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: error.message || "Something went wrong.",
      });
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(value);

    if (!value) {
      setError("Duration cannot be empty.");
    } else if (value <= 60) {
      setError("Duration must be greater than 60 minutes.");
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex items-center justify-center bg-green-400 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add a New Movie</h1>
        <form onSubmit={handleAddMovie} className="space-y-4">
          {/* Movie Poster */}
          <div>
            <label className="block font-medium text-gray-700">Movie Poster URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Enter movie poster URL"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Movie Title */}
          <div>
            <label className="block font-medium text-gray-700">Movie Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter movie title"
              className="input input-bordered w-full mt-1"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block font-medium text-gray-700">Genre</label>
            <select name="genre" className="input input-bordered w-full mt-1">
              <option value="" disabled>Select genre</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Animation">Animation</option>
              <option value="Adventure">Adventure</option>
              <option value="Superhero">Superhero</option>
              <option value="Thriller">Thriller</option>
              <option value="Family">Family</option>
              <option value="Biography">Biography</option>
              <option value="Crime">Crime</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              placeholder="Enter duration in minutes"
              className={`input input-bordered w-full mt-1 ${error ? "border-red-500" : ""}`}
              min="1"
              value={duration}
              onChange={handleDurationChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Rating */}
          <div>
            <label className="block font-medium text-gray-700">Rating (1 to 10)</label>
            <input
              type="number"
              name="rating"
              placeholder="Enter rating"
              className="input input-bordered w-full mt-1"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block font-medium text-gray-700">Summary</label>
            <textarea
              name="summary"
              placeholder="Enter a short summary of the movie"
              className="textarea textarea-bordered w-full mt-1"
              rows="4"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Release Year */}
          <div>
            <label className="block font-medium text-gray-700">Release Year</label>
            <select
              name="releaseYear"
              className="input input-bordered w-full mt-1"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
            >
              <option value="" disabled>Select year</option>
              {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
