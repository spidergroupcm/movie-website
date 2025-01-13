import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../pages/Home";
import AddMovie from "../pages/AddMovie";
import MyFavorites from "../pages/MyFavorites";
import Upcoming from "../pages/Upcoming";
import AllMovies from "../pages/AllMovies";
import MovieDetails from "../pages/MovieDetails";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import UpdateMovie from "../pages/UpdateMovie";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://movie-server-gules.vercel.app/movie").then((res) => res.json()),
      },
      {
        path: "/all-movies",
        element: <AllMovies></AllMovies>,
        loader: () => fetch("https://movie-server-gules.vercel.app/movie"),
      },
      {
        path: "/add-movie",
        element: (
          <PrivateRoute>
            <AddMovie></AddMovie>
          </PrivateRoute>
        ), // Protected route
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
             <MyFavorites></MyFavorites>,
          </PrivateRoute>
        )
        
      },
      {
        path: "/upcoming",
        element: <Upcoming></Upcoming>,
      },
      {
        path: "/movie-details/:id",
        element:<MovieDetails></MovieDetails>,
        loader: ({ params }) =>
          fetch(`https://movie-server-gules.vercel.app/movie/${params.id}`),
      },
      {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/forgot-password",
            element: <ForgotPassword></ForgotPassword>,
          },
          {
            path: "/auth/register",
            element: <Register></Register>,
          },
          {
            path: "/auth/update-movie/:id",
            element: <UpdateMovie></UpdateMovie>,
            loader: ({ params }) =>
              fetch(`https://movie-server-gules.vercel.app/movie/${params.id}`),
          },
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);

export default router;


