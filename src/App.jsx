import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./ui/Error";
import Header from "./ui/Header";
import HomePage, { loader as movieLoader } from "./pages/HomePage";
// import Saved from "./components/SavedContent";

const router = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: movieLoader,
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
