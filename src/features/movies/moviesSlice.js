import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  movieSave: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    saveMovie(state, action) {
      const isExist = state.movieSave.some(
        (m) => m.imdbID === action.payload.imdbID
      );
      if (!isExist) {
        state.movieSave.push(action.payload);
      }
    },
    deleteMovie(state, action) {
      state.movieSave = state.movieSave.filter(
        (m) => m.imdbID !== action.payload
      );
    },
    setSearch: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
    },
  },
});

export const { saveMovie, setSearch, clearSearch, deleteMovie } =
  movieSlice.actions;

export default movieSlice.reducer;

export const getSaveMovies = (state) => state.movies.movieSave;
