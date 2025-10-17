import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../features/movies/moviesSlice";

export default function ToggleWatchlistButton({ movie }) {
  const dispatch = useDispatch();
  const movieSave = useSelector((state) => state.movies.movieSave);
  const isSaved = movieSave.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="w-full">
      <button
        className={`border-2 flex w-40 items-center justify-center gap-2 px-8 py-2 rounded-xl font-base cursor-pointer transition-colors  ${
          isSaved
            ? "border-white text-white hover:bg-white hover:text-black"
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
        onClick={() => dispatch(toggleWatchlist(movie))}
      >
        {isSaved ? (
          <>
            <FaCheck className="text-xl" />
            <span>Added</span>
          </>
        ) : (
          <>
            <FiPlus className="text-xl" />
            <span>Watchlist</span>
          </>
        )}
      </button>
    </div>
  );
}
