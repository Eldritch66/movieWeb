import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function UserReview() {
  const ratingComments = useSelector((state) => state.movies.ratingComments);

  const movieIDs = Object.keys(ratingComments); // ["tt12345", "tt67890"]

  if (movieIDs.length === 0)
    return <p className="text-white px-4 mt-10">Belum ada review.</p>;

  return (
    <section className="text-white ml-20">
      <h1 className="">Your Movie Reviews</h1>

      <div className="">
        {movieIDs.map((id) => {
          const data = ratingComments[id];

          return (
            <div key={id} className="">
              <div className="f">
                <div>
                  <h2 className="">
                    IMDb ID: <span className="">{id}</span>
                  </h2>

                  <p className="">⭐ Rating: {data.rating}</p>
                </div>

                <Link to={`/movies/${id}`} className="">
                  Lihat film
                </Link>
              </div>

              <div className="mt-3">
                <h3 className="">Comments:</h3>
                <ul className="">
                  {data.comments.map((c, index) => (
                    <li key={index} className="">
                      <span className="">⭐ {c.rating}</span> — {c.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
