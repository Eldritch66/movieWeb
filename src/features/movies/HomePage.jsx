import { useLoaderData, Form } from "react-router";

export default function HomePage() {
  const movies = useLoaderData();
  console.log(movies);

  return (
    <div>
      <h1>Movie Search</h1>

      {/* Form automatically integrates with loader via query params */}
      <Form method="get">
        <input type="text" name="q" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </Form>

      <ul>
        {movies?.map((movie) => (
          <li key={movie.imdbID}>
            {movie.Title} ({movie.Year})
            <img src={movie.Poster} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
import { getMovies } from "../../services/apiMovies";

export async function loader({ request }) {
  const url = new URL(request.url);
  console.log(url);
  console.log("Cek params: ", url.searchParams.get("q"));

  const query = url.searchParams.get("q") || "batman"; // default search
  return getMovies({ query });
}
