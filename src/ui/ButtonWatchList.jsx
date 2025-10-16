import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../features/movies/moviesSlice";

export default function ToggleWatchlistButton({ movie, px, text, mt, width }) {
  const dispatch = useDispatch();
  const movieSave = useSelector((state) => state.movies.movieSave);
  const isSaved = movieSave.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className={`mt-${mt} w-full`}>
      <button
        className={`border-2 flex w-${width} items-center justify-center gap-2 px-${px} py-2 rounded-xl font-base cursor-pointer transition-colors  ${
          isSaved
            ? "border-white text-white hover:bg-white hover:text-black"
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
        onClick={() => dispatch(toggleWatchlist(movie))}
      >
        {isSaved ? (
          <>
            <FaCheck className={text} />
            <span>Added</span>
          </>
        ) : (
          <>
            <FiPlus className={text} />
            <span>Watchlist</span>
          </>
        )}
      </button>
    </div>
  );
}
