import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import MainContent from "./components/content";
// import Saved from "./components/SavedContent";

const KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [saveContent, setSaveContent] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Harry Potter");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie Not found");

        setError("");
        setMovies(data.Search);
        console.log(data.Search);
        console.log(data);
      } catch (err) {
        console.error("Error: ", err.message);
        setError(err.message);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar
        setQuery={setQuery}
        saveContent={saveContent}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
      <MainContent
        saveListContent={setSaveContent}
        movies={movies}
        error={error}
      />
    </>
  );
}

export default App;
