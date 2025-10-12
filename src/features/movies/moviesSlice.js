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
      state.movieSave = action.payload;
    },
    setSearch: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
    },
  },
});

export const { saveMovie, setSearch, clearSearch } = movieSlice.actions;

export default movieSlice.reducer;
