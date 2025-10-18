import { detailMovie } from "../../services/apiMovies";
import { useLoaderData, useNavigate, useNavigation } from "react-router";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { IoReturnUpBack } from "react-icons/io5";
import ToggleWatchlistButton from "../../ui/ButtonWatchList";

//{bookInfo.title.length > 20
// ? bookInfo.title.slice(0, 20) + "..."
// : bookInfo.title}

export default function DetailPage() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const movie = useLoaderData();

  //is this film already save?
  // console.log(movie);
  const isLoading = navigation.state === "loading";
  const genreString = movie.Genre;
  const genres = genreString.split(", ").map((g) => g.trim());

  return (
    <main className="ml-10 sm:ml-40 mt-4">
      <article className="text-white flex flex-row">
        <div className="flex flex-col">
          {!isLoading && (
            <span className="mb-2">
              <IoReturnUpBack
                onClick={() => navigate(-1)}
                className="text-4xl text-white cursor-pointer"
              />
            </span>
          )}
          <img
            src={movie.Poster}
            alt=""
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <header className="flex flex-col ml-10 mt-8">
          <h1 className="font-bold text-2xl">{movie.Title}</h1>
          <p className="mt-1 text-sm text-gray-400">
            {movie.Country} • {movie.Year} • {movie.Runtime}
          </p>
          <div className="flex flex-row my-4">
            <div id="genres">
              <span className="mr-2 px-3 py-1 bg-[#2a2a36] text-gray-100 text-sm font-medium rounded-full">
                {movie.Type}
              </span>
              {genres.map((g, i) => (
                <span
                  key={i}
                  className="mr-2 px-3 py-1 bg-[#2a2a36] text-gray-100 text-sm font-medium rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
            <div id="rating">
              <span id="star">⭐</span> {movie.imdbRating} IMDb rating
            </div>
          </div>
          <section className="max-w-[700px] mx-auto">
            <p className="text-white text-justify leading-relaxed font-sans break-words whitespace-normal text-base">
              {expanded || movie.Plot.length <= 300 ? (
                movie.Plot
              ) : (
                <>
                  {movie.Plot.slice(0, 300)}
                  <span
                    className="text-gray-400 cursor-pointer hover:text-gray-500"
                    onClick={() => setExpanded(true)}
                  >
                    ...read more
                  </span>
                </>
              )}
            </p>
          </section>

          <section className="mt-2">
            <ul>
              <li className="mb-1">
                <span className="text-gray-400 uppercase text-sm tracking-wider">
                  Writer
                </span>
                <br />
                <span className="text-base">{movie.Writer}</span>
              </li>
              <li className="mb-1">
                <span className="text-gray-400 uppercase text-sm tracking-wider">
                  Director
                </span>
                <br />
                <span className="text-base">{movie.Director}</span>
              </li>
              <li className="mb-1">
                <span className="text-gray-400 uppercase text-sm tracking-wider">
                  Actor
                </span>
                <br />
                <span className="text-base">{movie.Actors}</span>
              </li>
            </ul>
          </section>
          <div className="mt-4">
            <ToggleWatchlistButton movie={movie} px="20" width="40" />
          </div>
        </header>
      </article>
    </main>
  );
}

export async function loader({ params }) {
  const movie = await detailMovie(params.id);
  return movie;
}
