import { createSlice } from "@reduxjs/toolkit";

// Load comment & rating from localStorage
const loadData = () => {
  const data = localStorage.getItem("ratingComments");
  return data ? JSON.parse(data) : {};
};

//  save localStorage
const saveData = (data) => {
  localStorage.setItem("ratingComments", JSON.stringify(data));
};

const initialState = {
  query: "",
  movieSave: [],
  userRating: {},
  ratingComments: loadData(),
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
        state.movieSave.push(action.payload);
      }
    },

    setSearch(state, action) {
      state.query = action.payload;
    },

    clearSearch(state) {
      state.query = "";
    },

    // ⭐ SET RATING
    setMovieRating(state, action) {
      const { imdbID, rating } = action.payload;

      if (!state.ratingComments[imdbID]) {
        state.ratingComments[imdbID] = { rating: 0, comments: [] };
      }

      state.ratingComments[imdbID].rating = rating;
      saveData(state.ratingComments); // save ke storage
    },

    addMovieComment(state, action) {
      const { imdbID, comment } = action.payload;

      if (!state.ratingComments[imdbID]) {
        state.ratingComments[imdbID] = { rating: 0, comments: [] };
      }

      state.ratingComments[imdbID].comments.push({
        text: comment,
        rating: state.ratingComments[imdbID].rating,
      });

      saveData(state.ratingComments);
    },

    editMovieComment(state, action) {
      const { imdbID, index, newComment } = action.payload;
      state.ratingComments[imdbID].comments[index] = newComment;
      saveData(state.ratingComments);
    },

    deleteMovieComment(state, action) {
      const { imdbID, index } = action.payload;
      state.ratingComments[imdbID].comments.splice(index, 1);
      saveData(state.ratingComments);
    },
    editMovieRating(state, action) {
      const { imdbID, newRating } = action.payload;
      if (!state.ratingComments[imdbID]) return;

      state.ratingComments[imdbID].rating = newRating;
    },
  },
});

export const {
  toggleWatchlist,
  setSearch,
  clearSearch,
  setMovieRating,
  addMovieComment,
  editMovieComment,
  deleteMovieComment,
  editMovieRating,
} = movieSlice.actions;

export default movieSlice.reducer;

// SELECTORS
export const getMovieRating = (state, imdbID) =>
  state.movies.ratingComments[imdbID]?.rating || 0;

export const getSaveMovies = (state) => state.movies.movieSave;
