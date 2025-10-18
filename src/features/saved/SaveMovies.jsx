import { useDispatch, useSelector } from "react-redux";
import { getSaveMovies } from "../movies/moviesSlice";
import { TfiTime } from "react-icons/tfi";
import { PiSpeakerSimpleHighLight, PiSubtitles } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toggleWatchlist } from "../movies/moviesSlice";

export default function SavePages() {
  const movieSave = useSelector(getSaveMovies);
  console.log(movieSave);
  const dispatch = useDispatch();
  return (
    <section className="min-w-[300px] max-w-[1100px] h-auto mt-8 ml-2 mr-2  sm:ml-20 xl:ml-44">
      <div className="w-full h-10 relative">
        <h1 className="uppercase text-xl sm:text-4xl text-white font-mono ">
          Watchlist
        </h1>
        <p className="absolute right-0 top-4 mr-2 text-xs sm:top-6 text-gray-400 sm:text-sm">
          All your favorite movies in one place
        </p>
        <hr className="text-gray-600 mt-2 w-full" />
      </div>
      <div className="w-full flex flex-wrap mt-4 mb-4">
        {movieSave.map((ms) => (
          <WatchList movieList={ms} key={ms.imdbID} dispatch={dispatch} />
        ))}
      </div>
    </section>
  );
}

function WatchList({ movieList, dispatch }) {
  return (
    <div className="w-[260px] h-64 bg-black ml-3 overflow-y-auto sm:overflow-hidden md:w-72 xl:w-80 flex flex-row sm:ml-4 mt-4 relative">
      <button className="absolute top-0 left-0 text-white text-center z-20  cursor-pointer">
        <IoCloseCircleOutline
          className="text-3xl bg-black/50 rounded-full"
          onClick={() => dispatch(toggleWatchlist(movieList))}
        />
      </button>
      <img
        src={movieList.Poster}
        alt=""
        className="w-[50%] h-full object-cover"
      />
      <div className="border-l-2 border-l-gray-600 h-full">
        <h2 className="text-sm text-white font-sans ml-2 font-semibold mt-4 px-2 mr-2">
          {movieList.Title}
        </h2>
        <p className="ml-2 text-xs mt-0 sm:mt-2 px-2 text-gray-300">
          Directed by {movieList.Director}
        </p>
        <ul className="ml-2 mt-2 text-gray-400">
          <li className="px-2  flex flex-row items-center">
            <TfiTime className="text-sm" />
            <span className="text-xs px-2">{movieList.Runtime}</span>
          </li>
          <li className="px-2  flex flex-row mt-1 items-center">
            <PiSpeakerSimpleHighLight className="text-sm" />
            <span className="text-xs px-2">{movieList.Country}</span>
          </li>
          <li className="flex flex-row mt-1 ml-2 items-center overflow-hidden">
            <PiSubtitles className="text-sm" />
            <span className="px-2">
              <span className="text-xs px-2">
                {movieList.Language
                  ? movieList.Language.length > 20
                    ? movieList.Language.slice(0, 20) + "..."
                    : movieList.Language
                  : ""}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
