import { useDispatch, useSelector } from "react-redux";
import { getSaveMovies } from "../movies/moviesSlice";

export default function SavePages() {
  const movieSave = useSelector(getSaveMovies);
  console.log(movieSave);
  const dispatch = useDispatch();
  return (
    <div>
      {movieSave.map((ms) => (
        <span>{ms.Title}</span>
      ))}
    </div>
  );
}
