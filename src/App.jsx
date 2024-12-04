import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoriesPage from "./pages/CategoriesPage";
import AuthorsPage from "./pages/AuthorsPage";
import LibraryPage from "./pages/LibraryPage";
import AuthorStoriesPage from "./pages/AuthorStoriesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import CategoriesStoriesPage from "./pages/CategoriesStoriesPage";

import Sidebar from "react-sidebar";
import SidebarPlayer from "./components/sidebar/SidebarPlayer";
import { useDispatch, useSelector } from "react-redux";
import {
  setStoryInfo,
  toggleSidebar,
  updateSpotifyToken,
} from "./store/user/authSlice";
import { useGetRefreshTokenAPIQuery } from "./store/user/userApiSlice";
import { useEffect, useState } from "react";
import MediaPlayer from "./components/sidebar/MediaPlayer";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: "/", element: <HomePage /> },
      { index: true, element: <LoginPage /> }, //with index, alternate to path: "/"
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgotpassword", element: <ForgotPasswordPage /> },
      { path: "/resetpassword/:token", element: <ResetPassword /> },
      { path: "/verifyemail/:verifytoken", element: <EmailVerification /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/categories", element: <CategoriesPage /> },
          { path: "/stories", element: <CategoriesStoriesPage /> },
          { path: "/authors", element: <AuthorsPage /> },
          { path: "/authorstories", element: <AuthorStoriesPage /> },
          { path: "/library", element: <LibraryPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [shouldFetchToken, setShouldFetchToken] = useState(false);
  const { isSidebarOpen, isLoggedIn } = useSelector((state) => state.auth);

  const {
    data: spotifyToken,
    isLoading: spotifyTokenLoading,
    refetch: refetchSpotifyToken,
  } = useGetRefreshTokenAPIQuery(null, { skip: !shouldFetchToken });

  useEffect(() => {
    if (spotifyToken) {
      dispatch(updateSpotifyToken({ spotifyToken: spotifyToken.spotifyToken }));
    }
  }, [spotifyToken, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      setShouldFetchToken(false);
      return;
    }
    setShouldFetchToken(true);
    const refreshInterval = 59 * 60 * 1000; // for every 59 minutes
    const intervalId = setInterval(() => {
      refetchSpotifyToken();
    }, refreshInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [refetchSpotifyToken, isLoggedIn]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
