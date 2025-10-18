import { useLoaderData, useNavigation, useNavigate, Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaRegBookmark, FaPlay, FaCircle } from "react-icons/fa";
import Loading from "../../ui/Loading";
import { useEffect } from "react";
import { getMovies } from "../../services/apiMovies";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "./moviesSlice";
import { headerPoster } from "./dataPosterHeader";

const firstImg = headerPoster[0].img;
const firstId = headerPoster[0].imdbID;

export default function HomePage() {
  const movies = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryInput = useSelector((state) => state.movies.query);

  const isLoading = navigation.state === "loading";
  // const location = useLocation();

  // Ambil query dari URL saat pertama kali render
  // const [search, setSearch] = useState(() => {
  //   const params = new URLSearchParams(location.search);
  //   return params.get("q") || "";
  // });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (queryInput) params.set("q", queryInput);
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(timeout);
  }, [queryInput, navigate]);
  return (
    <>
      <section
        id="inputSearch"
        className="w-full max-w-[1200px] sm:mx-auto mt-8 flex justify-center px-4 sm:px-8"
      >
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100 text-xl" />
          <input
            id="searchBar"
            name="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="w-48 bg-[#2B2B36] text-white font-mono rounded-full py-1.5 pl-9 pr-3 transition-all duration-300 placeholder:text-stone-400 outline-none focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 md:w-96 md:focus:w-[600px]"
          />
        </div>
      </section>

      <div
        id="title-banner"
        className="relative w-full max-w-[1200px] h-auto ml-0 sm:h-64 md:h-80 mt-8 md:ml-24 xl:ml-40"
      >
        <header className="w-[95%] relative h-full mx-auto rounded-lg overflow-hidden">
          <img
            src={firstImg}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="w-full absolute inset-0 bg-black/30  opacity-50" />

          <div className="absolute top-0 left-5  sm:left-20 z-10">
            <div className="bg-green-600 h-8 sm:h-10 rounded-bl-xl rounded-br-xl w-8">
              <FaRegBookmark className="cursor-pointer text-2xl sm:text-3xl m-auto pt-2 text-white z-20" />
            </div>
          </div>

          <div className="absolute left-5 bottom-5 sm:left-20 sm:bottom-10 flex flex-col text-white z-40">
            <h2 className="text-xs sm:text-xl font-bold mb-1">
              Chainsaw Man – The Movie: <br /> Reze Arc
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              2025 ‧ Horror/Adventure ‧ 1h 40m
            </p>
            <span className="bg-green-600 rounded-xl mt-2 w-20 text-sm sm:w-48 p-1.5 font-mono sm:text-xl text-center cursor-pointer">
              <Link to={`/movies/${firstId}`}>Detail</Link>
            </span>
          </div>
        </header>

        <div className="text-white absolute left-1/2 -translate-x-1/2 flex flex-row mt-4 gap-5">
          <FaCircle className="text-[10px] text-[#2B2B36] font-extralight cursor-pointer" />
          <FaCircle className="text-[10px] text-green-600 font-extralight cursor-pointer" />
          <FaCircle className="text-[10px] text-[#2B2B36] font-extralight cursor-pointer" />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <main className="mt-8">
            <span className="text-white text-xl font-bold ml-1">
              {queryInput.length === 0 ? "Evangelion" : queryInput}
            </span>
            <section className="flex flex-row flex-wrap justify-center gap-6 mt-5">
              {movies?.map((m, i) => (
                <ShowMovies movies={m} key={i} />
              ))}
            </section>
          </main>
        )}
      </div>
    </>
  );
}

function ShowMovies({ movies }) {
  return (
    <div className="w-28 h-32 object-center sm:w-48 sm:h-78 relative  group overflow-hidden rounded-lg cursor-pointer">
      <Link to={`/movies/${movies.imdbID}`}>
        <img
          className="w-48 h-78 object-cover transition-all duration-300 group-hover:scale-110"
          src={movies.Poster}
          alt={movies.Title}
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        bg-black/40 text-white font-mono text-base px-4 py-4 rounded-full
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-black/30 "
        >
          <FaPlay className="text-green-400" />
        </span>

        <span className="absolute bottom-0 left-0 w-full text-white bg-black/70 text-sm text-center py-1">
          {movies.Title}
        </span>
      </Link>
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  // console.log("Cek params: ", url.searchParams.get("q"));

  const query = url.searchParams.get("q") || "evangelion";
  return getMovies({ query });
}
