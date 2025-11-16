import { useLoaderData, useNavigation, useNavigate, Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FaRegBookmark, FaPlay, FaCircle } from "react-icons/fa";
import Loading from "../../ui/Loading";
import { useEffect, useState } from "react";
import { getMovies, detailMovie } from "../../services/apiMovies";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "./moviesSlice";
import { headerPoster, fetchGenre } from "./dataPosterHeader";

export default function HomePage() {
  //handle genre state
  const [genreMovies, setGenreMovies] = useState(null);
  const [loadingGenre, setLoadingGenre] = useState(false);
  //handle genre state end

  const movies = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const queryInput = useSelector((state) => state.movies.query);

  const isLoading = navigation.state === "loading";

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % headerPoster.length),
      3000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!queryInput) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (queryInput) params.set("q", queryInput);
      navigate(`?${params.toString()}`, { replace: true });

      setGenreMovies(null); // Clear genre movies when searching
    }, 500);

    return () => clearTimeout(timeout);
  }, [queryInput, navigate]);

  // HANDLE CLICK GENRE START
  async function handleGenreClick(genreKey) {
    setLoadingGenre(true);
    setGenreMovies(null);

    const ids = fetchGenre[genreKey];
    const details = await Promise.all(ids.map((id) => detailMovie(id)));

    setGenreMovies(details);
    setLoadingGenre(false);

    dispatch(setSearch(""));
    navigate(`?`);
  }
  // HANDLE CLICK GENRE END
  return (
    <>
      <section
        id="inputSearch"
        className="w-full max-w-[1200px] sm:mx-auto mt-8 flex px-0 sm:px-8 flex-col sm:flex-row"
      >
        <ul className="w-full flex justify-center  flex-row gap-20 text-white font-mono text-sm sm:justify-start sm:text-base md:text-xl mt-4">
          <li
            className="cursor-pointer"
            onClick={() => handleGenreClick("anime")}
          >
            Anime
          </li>

          <li
            className="cursor-pointer"
            onClick={() => handleGenreClick("action")}
          >
            Action
          </li>

          <li
            className="cursor-pointer"
            onClick={() => handleGenreClick("drama")}
          >
            Drama
          </li>
        </ul>

        <div className="flex-1 flex justify-center mt-4 sm:justify-end">
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100 text-xl" />
            <input
              className="w-48 bg-[#2B2B36] text-white font-mono rounded-full py-1.5 pl-9 pr-3 transition-all duration-300 placeholder:text-stone-400 outline-none focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 md:w-96 md:focus:w-[600px]"
              id="searchBar"
              name="search"
              type="text"
              placeholder="Search..."
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
          </div>
        </div>
      </section>

      <div
        id="title-banner"
        className="relative w-full max-w-[1200px] h-auto sm:h-64 md:h-80 mt-8 md:ml-10 xl:ml-40 scroll-smooth"
      >
        <header className="w-full relative h-full sm:mx-auto rounded-lg overflow-hidden">
          <img
            src={headerPoster[currentIndex].img}
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="w-full absolute inset-0 bg-black/30  opacity-50" />

          <div className="absolute top-0 left-5  sm:left-20 z-10">
            <div className="bg-green-600 h-8 sm:h-10 rounded-bl-xl rounded-br-xl w-8">
              <FaRegBookmark className="cursor-pointer text-2xl sm:text-3xl m-auto pt-2 text-white z-20" />
            </div>
          </div>

          <div className="absolute left-5 bottom-5 sm:left-20 sm:bottom-10 flex flex-col text-white z-40">
            <h2 className="text-xs sm:text-xl font-bold mb-1">
              {headerPoster[currentIndex].Title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {headerPoster[currentIndex].dateGenre}
            </p>
            <span className="bg-green-600 rounded-xl mt-2 w-20 text-sm sm:w-48 p-1.5 font-mono sm:text-xl text-center cursor-pointer">
              <Link to={`/movies/${headerPoster[currentIndex].imdbID}`}>
                Detail
              </Link>
            </span>
          </div>
        </header>

        {/* CAROUSEL BUTTON */}
        <div className="flex gap-3 absolute left-1/2 -translate-x-1/2 mt-4">
          {headerPoster.map((_, index) => (
            <FaCircle
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`text-[10px] cursor-pointer ${
                index === currentIndex ? "text-green-600" : "text-[#2B2B36]"
              }`}
            />
          ))}
        </div>

        {loadingGenre || isLoading ? (
          <Loading />
        ) : (
          <main className="mt-12">
            <section className="flex flex-row flex-wrap justify-center gap-3 sm:gap-6 mt-5">
              {(genreMovies ?? movies)?.map((m, i) => (
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
    <div className="w-30 h-40 mt-2 sm:w-48 sm:h-78 relative  group overflow-hidden rounded-lg cursor-pointer">
      <Link to={`/movies/${movies.imdbID}`}>
        <img
          className="w-full h-[100px] object-contain sm:object-cover sm:h-full object-center transition-all duration-300 group-hover:scale-110"
          src={movies.Poster}
          alt={movies.Title}
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-80 transition-opacity duration-300 w-0 h-0 sm:h-full sm:w-full" />

        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        bg-black/40 text-white font-mono text-base px-4 py-4 rounded-full
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-black/30 "
        >
          <FaPlay className="text-green-400" />
        </span>

        <h2 className="w-full h-auto overflow-y-hidden text-center sm:absolute sm:bottom-0 sm:left-0 text-white sm:bg-black/70 text-xs sm:text-sm py-1">
          {movies.Title}
        </h2>
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
