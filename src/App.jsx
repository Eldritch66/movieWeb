import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./ui/Error";
import AppLayout from "./ui/Layout";
import HomePage, { loader as movieLoader } from "./features/movies/HomePage";
import DetailPage, {
  loader as detailLoader,
} from "./features/movies/DetailMovie";
import SaveMovies from "./features/saved/SaveMovies";
import UserReview from "./features/user/UserReview";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          loader: movieLoader,
        },
        {
          path: "/movies/:id",
          element: <DetailPage />,
          loader: detailLoader,
        },
        {
          path: "/saveMovies/",
          element: <SaveMovies />,
        },
        {
          path: "/userReview/",
          element: <UserReview />,
        },
      ],
    },
  ],
  {
    basename: "/movieWeb",
  }
);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading app...</p>} />
  );
}

export default App;
