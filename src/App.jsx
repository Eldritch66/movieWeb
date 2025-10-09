import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./ui/Error";
import AppLayout from "./ui/Layout";
import HomePage, { loader as movieLoader } from "./features/movies/HomePage";
import DetailPage from "./features/movies/DetailMovie";
// import Saved from "./components/SavedContent";

const router = createBrowserRouter([
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
        // loader: movieDetailLoader,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading app...</p>} />
  );
}

export default App;
