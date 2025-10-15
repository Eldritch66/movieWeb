import { useDispatch, useSelector } from "react-redux";
import { getSaveMovies } from "../movies/moviesSlice";
import { TfiTime } from "react-icons/tfi";
import { PiSpeakerSimpleHighLight, PiSubtitles } from "react-icons/pi";
import ToggleWatchlistButton from "../../ui/ButtonWatchList";

export default function SavePages() {
  const movieSave = useSelector(getSaveMovies);
  console.log(movieSave);
  // const dispatch = useDispatch();
  return (
    <section className=" w-[1100px] h-auto mt-8 ml-20">
      <h1 className="uppercase text-4xl text-white font-mono">Watchlist</h1>
      <hr className="text-white mt-2" />
      <div className="w-full flex flex-wrap mt-4">
        {movieSave.map((ms) => (
          <WatchList movieList={ms} key={ms.imdbID} />
        ))}
      </div>
    </section>
  );
}

function WatchList({ movieList }) {
  return (
    <div className="w-80 h-64 flex flex-row bg-black ml-8 mt-4">
      <img src={movieList.Poster} alt="" className="w-40 h-full object-cover" />
      <div className="border-l-2 border-l-gray-600 h-full ">
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
          <li className="ml-2 mt-2">
            <ToggleWatchlistButton movie={movieList} px="4" text="text-sm" />
          </li>
        </ul>
      </div>
    </div>
  );
}
