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
    <section className=" w-[1100px] h-auto mt-8 ml-20">
      <h1 className="uppercase text-4xl text-white font-mono">Watchlist</h1>
      <hr className="text-white mt-2" />
      <div className="w-full flex flex-wrap mt-4">
        {movieSave.map((ms) => (
          <WatchList movieList={ms} key={ms.imdbID} dispatch={dispatch} />
        ))}
      </div>
    </section>
  );
}

function WatchList({ movieList, dispatch }) {
  return (
    <div className="w-80 h-64 flex flex-row bg-black ml-8 mt-4 relative">
      <button className="absolute top-0 left-0 text-white text-center z-50  cursor-pointer">
        <IoCloseCircleOutline
          className="text-3xl bg-black/30 rounded-full"
          onClick={() => dispatch(toggleWatchlist(movieList))}
        />
      </button>
      <img src={movieList.Poster} alt="" className="w-40 h-full object-cover" />
      <div className="border-l-2 border-l-gray-600 h-full">
        <h2 className="text-sm text-white font-sans ml-2 font-semibold mt-4 px-2">
          {movieList.Title}
        </h2>
        <p className="ml-2 text-sm mt-2 px-2 text-gray-300">
          Directed by {movieList.Director}
        </p>
        <ul className="ml-2 mt-2 text-gray-400">
          <li className="px-2  flex flex-row items-center">
            <TfiTime className="text-sm" />
            <span className="text-sm px-2">{movieList.Runtime}</span>
          </li>
          <li className="px-2  flex flex-row mt-1 items-center">
            <PiSpeakerSimpleHighLight className="text-sm" />
            <span className="text-sm px-2">{movieList.Country}</span>
          </li>
          <li className="flex flex-row mt-1 ml-2 items-center overflow-hidden">
            <PiSubtitles className="text-sm" />
            <span className="text-sm px-2">
              <span className="text-sm px-2">
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
