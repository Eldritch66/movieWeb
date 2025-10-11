import {
  useLoaderData,
  useNavigation,
  useNavigate,
  useLocation,
  Link,
} from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaRegBookmark, FaPlay } from "react-icons/fa";
import Loading from "../../ui/Loading";
import { useEffect, useState } from "react";
import { getMovies } from "../../services/apiMovies";

export default function HomePage() {
  const movies = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const navigate = useNavigate();
  const location = useLocation();

  // Ambil query dari URL saat pertama kali render
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  });

  // Debounce effect: hanya update URL setelah user berhenti mengetik
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      if (search) {
        params.set("q", search);
      } else {
        params.delete("q");
      }
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, navigate, location.search]);
  return (
    <>
      <section
        id="inputSearch"
        className="max-w-[1040px]  mt-8 ml-20 flex justify-center"
      >
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 bg-[#2B2B36] text-white font-mono rounded-full py-1.5 pl-9 pr-3 transition-all duration-300 placeholder:text-stone-400 outline-none focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 md:w-96 md:focus:w-[600px]"
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
      {isLoading && <Loading />}

      <main className="ml-20 mt-8 max-w-[1040px]">
        <span className="text-white text-xl font-bold ml-1">
          {search.length === 0 ? "Evangelion" : search}
        </span>
        <section className="flex flex-row mt-5 flex-wrap">
          {movies?.map((m) => (
            <ShowMovies movies={m} key={m.imdbID} />
          ))}
        </section>
      </main>
    </>
  );
}

function ShowMovies({ movies }) {
  return (
    <div className="w-48 h-78 relative m-2 group overflow-hidden rounded-lg cursor-pointer">
      {/* Gambar utama */}
      <img
        className="w-48 h-78 object-cover transition-all duration-300 group-hover:scale-110"
        src={movies.Poster}
        alt={movies.Title}
      />

      {/* Overlay gelap muncul saat hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Link to={`/movies/${movies.imdbID}`}>
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        bg-green-600 text-white font-mono text-base px-4 py-4 rounded-full
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-green-700"
        >
          <FaPlay className="" />
        </span>
      </Link>

      <span className="absolute bottom-0 left-0 w-full text-white bg-black/70 text-sm text-center py-1">
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
