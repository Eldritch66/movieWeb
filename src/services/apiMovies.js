const KEY = import.meta.env.VITE_API_KEY;

export async function getMovies({ query }) {
  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${KEY}`);

  if (!res.ok) throw Error("failed to fetch");
  const data = await res.json();

  if (data.Response === "False") {
    return []; // balikin array kosong
  }
  return data.Search || [];
}
