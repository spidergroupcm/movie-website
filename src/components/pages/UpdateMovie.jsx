import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateMovie = () => {
    const movie = useLoaderData();
    const { _id, photo, title, genre, duration, rating, releaseYear,summary} =movie


    const handleUpdateMovie = (e) => {
      e.preventDefault();
    
      const form = e.target;
      const photo = form.photo.value;
      const title = form.title.value;
      const genre = form.genre.value;
      const duration = form.duration.value;
      const rating = form.rating.value;
      const summary = form.summary.value;
      const releaseYear = form.releaseYear.value;
    
      const updatedMovie = { photo, title, genre, duration, rating, summary, releaseYear };
      console.log(updatedMovie);

      fetch(`https://movie-server-gules.vercel.app/movie/${_id}`, {
        method: 'PUT',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(updatedMovie)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.modifiedCount > 0){
          Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Movie Updated successfully.",
          confirmButtonText: "OK"
          })
        }

      })

    };
    
    

    return (
        <div>

            <div className="min-h-screen max-w-7xl mx-auto flex items-center justify-center bg-green-400 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Movie - {title}</h1>
            <form onSubmit={handleUpdateMovie} className="space-y-4">
            {/* Movie Poster */}
            <div>
            <label className="block font-medium text-gray-700">Movie Poster URL</label>
            <input
            type="text"
            name="photo"
            defaultValue={photo}
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
          defaultValue={title}
          placeholder="Enter movie title"
          className="input input-bordered w-full mt-1"
        />
      </div>

      {/* Genre */}
      <div>
        <label className="block font-medium text-gray-700">Genre</label>
        <select name="genre" defaultValue={genre} className="input input-bordered w-full mt-1">
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
          defaultValue={duration}
          placeholder="Enter duration in minutes"
          className="input input-bordered w-full mt-1"
          min="1"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block font-medium text-gray-700">Rating (1 to 10)</label>
        <input
          type="number"
          name="rating"
          defaultValue={rating}
          placeholder="Enter rating"
          className="input input-bordered w-full mt-1"
          min="1"
          max="10"
          required
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block font-medium text-gray-700">Summary</label>
        <textarea
          name="summary"
          defaultValue={summary}
          placeholder="Enter a short summary of the movie"
          className="textarea textarea-bordered w-full mt-1"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Release Year */}
      <div>
        <label className="block font-medium text-gray-700">Release Year</label>
        <select name="releaseYear" defaultValue={releaseYear} className="input input-bordered w-full mt-1" required>
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
        Update Movie
      </button>
    </form>
  </div>
</div>

        </div>
    );
};

export default UpdateMovie;