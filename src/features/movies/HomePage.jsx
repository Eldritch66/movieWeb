import { useLoaderData } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";

export default function HomePage() {
  const movies = useLoaderData();
  console.log(movies);

  return (
    <>
      <section
        id="genre"
        className="max-w-[1040px]  mt-8 ml-20 flex flex-row justify-between"
      >
        <ul className="w-96 flex flex-row justify-between text-white">
          <li className="cursor-pointer">Movie</li>
          <li className="cursor-pointer">Series</li>
          <li className="cursor-pointer">Anime</li>
          <li className="cursor-pointer">TvShow</li>
        </ul>

        <div className="relative w-48">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#2B2B36] text-white font-mono rounded-full py-1.5 pl-9 pr-3 outline-none"
          />
        </div>
      </section>

      <div
        id="title-banner"
        className="relative max-w-[1040px] h-80 ml-20 mt-8"
      >
        <img
          src="/images/chainsawman.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-10 z-10">
          <div className="bg-green-600 h-10 rounded-bl-xl rounded-br-xl w-8">
            <FaRegBookmark className="cursor-pointer text-3xl m-auto pt-2 text-white z-20" />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/30 rounded-lg " />

        <div className="absolute left-10 bottom-10 flex flex-col text-white">
          <h2 className="text-xl font-bold mb-1">
            Chainsaw Man – The Movie: <br /> Reze Arc
          </h2>
          <p className="text-sm text-gray-400">
            2025 ‧ Horror/Adventure ‧ 1h 40m
          </p>
          <span className="bg-green-600 rounded-xl mt-2 w-48 p-1.5 font-mono text-xl text-center cursor-pointer">
            Watch now
          </span>
        </div>
      </div>

      <main className="ml-20 mt-8 max-w-[1040px]">
        <span className="text-white text-xl">Anime</span>
        <section className="flex flex-row mt-5 flex-wrap">
          {movies?.map((m) => (
            <ShowMovies movies={m} />
          ))}
        </section>
      </main>
    </>
  );
}
import { getMovies } from "../../services/apiMovies";

function ShowMovies({ movies }) {
  return (
    <div className="w-48 h-78 relative m-2">
      <img className="w-48 h-78 object-cover" src={movies.Poster} />
      <span className="absolute bottom-0 text-white bg-black/30">
        {movies.Title}
      </span>
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  console.log(url);
  console.log("Cek params: ", url.searchParams.get("q"));

  const query = url.searchParams.get("q") || "evangelion"; // default search
  return getMovies({ query });
}
