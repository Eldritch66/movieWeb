import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  movieSave: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleWatchlist(state, action) {
      const isExist = state.movieSave.some(
        (m) => m.imdbID === action.payload.imdbID
      );

      if (isExist) {
        state.movieSave = state.movieSave.filter(
          (m) => m.imdbID !== action.payload.imdbID
        );
      } else {
        //if not exist add new movie to wathclist
        state.movieSave.push(action.payload);
      }
    },
    setSearch(state, action) {
      state.query = action.payload;
    },
    clearSearch(state) {
      state.query = "";
    },
  },
});

export const { toggleWatchlist, setSearch, clearSearch } = movieSlice.actions;
export default movieSlice.reducer;

export const getSaveMovies = (state) => state.movies.movieSave;
