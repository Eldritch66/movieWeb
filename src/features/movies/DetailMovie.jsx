import { detailMovie } from "../../services/apiMovies";
import { useLoaderData } from "react-router";

export default function DetailPage() {
  const movie = useLoaderData();

  return <div>{movie.Title}</div>;
}

export async function loader({ params }) {
  const movie = await detailMovie(params.id);
  return movie;
}
