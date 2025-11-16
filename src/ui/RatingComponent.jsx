import { useDispatch, useSelector } from "react-redux";
import {
  addMovieComment,
  deleteMovieComment,
  editMovieComment,
  setMovieRating,
  editMovieRating,
} from "../features/movies/moviesSlice";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import {
  MdDeleteForever,
  MdDone,
  MdOutlineDoneOutline,
  MdCancel,
} from "react-icons/md";

function RatingComment() {
  const movie = useLoaderData();
  const imdbID = movie.imdbID;

  const dispatch = useDispatch();

  const ratingData = useSelector(
    (state) => state.movies.ratingComments[imdbID]
  );

  const currentRating = ratingData?.rating || 0;
  const comments = ratingData?.comments || [];

  const [commentText, setCommentText] = useState("");

  // --- NEW: Editing rating state
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [tempRating, setTempRating] = useState(currentRating);

  const handleRatingChange = (_, newValue) => {
    if (isEditingRating) {
      setTempRating(newValue);
    } else {
      dispatch(setMovieRating({ imdbID, rating: newValue }));
    }
  };

  const handleSaveRating = () => {
    dispatch(editMovieRating({ imdbID, newRating: tempRating }));
    setIsEditingRating(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(addMovieComment({ imdbID, comment: commentText }));
    setCommentText("");
  };

  return (
    <section className="mt-10 px-4 text-white h-[400px] overflow-y-auto max-w-5xl">
      <h2 className="text-xl font-sans font-semibold mb-2">
        {currentRating === 0 ? "Give Rating" : "Your Rating"}
      </h2>

      <div className="flex items-center gap-3 mb-3 font-mono">
        <Rating
          name="movie-rating"
          value={isEditingRating ? tempRating : currentRating}
          onChange={handleRatingChange}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={
            <StarBorderIcon
              fontSize="inherit"
              className="opacity-100 text-yellow-300"
            />
          }
          disabled={!isEditingRating && currentRating > 0} // disable if already rated & not editing
        />

        {currentRating > 0 && !isEditingRating && (
          <button
            onClick={() => {
              setIsEditingRating(true);
              setTempRating(currentRating);
            }}
            className="text-blue-400 text-xl"
          >
            <FaRegEdit />
          </button>
        )}

        {isEditingRating && (
          <button onClick={handleSaveRating} className="text-green-500 text-xl">
            <MdOutlineDoneOutline />
          </button>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-3">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 rounded-md bg-[#1e1e2a] text-white outline-none focus:ring-2 focus:ring-green-600"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </form>

      <div className="mt-6 font-mono text-large">
        <h3 className="font-medium mb-2 text-sm sm:text-xl">
          {comments.length > 0 ? "Your Review:" : ""}
        </h3>
        <ul className="space-y-2">
          {comments.map((comment, i) => (
            <CommentItem key={i} comment={comment} index={i} imdbID={imdbID} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CommentItem({ comment, index, imdbID }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  return (
    <li className="px-3 py-2 bg-[#2a2a36] rounded-md text-sm text-gray-200 flex justify-between items-center">
      {isEditing ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-2 py-1 mr-2 rounded bg-[#1e1e2a]"
          />
          <button
            onClick={() => {
              dispatch(
                editMovieComment({
                  imdbID,
                  index,
                  newComment: text,
                })
              );
              setIsEditing(false);
            }}
            className="text-green-400 mr-2 text-xl"
          >
            <MdDone />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-400 text-xl"
          >
            <MdCancel />
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <span className="text-yellow-400 text-xs">⭐ {comment.rating}</span>
            <span>{comment.text}</span>
          </div>{" "}
          <div className="flex gap-3">
            <FaRegEdit
              onClick={() => setIsEditing(true)}
              className="text-green-600 text-xl"
            />

            <MdDeleteForever
              onClick={() => dispatch(deleteMovieComment({ imdbID, index }))}
              className="text-red-600 text-xl"
            />
          </div>
        </>
      )}
    </li>
  );
}

export default RatingComment;
