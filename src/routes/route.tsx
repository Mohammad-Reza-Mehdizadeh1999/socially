import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import NotificationsPage from "../pages/Notification";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/Register";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "profile/:username", element: <ProfilePage /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

const router = createBrowserRouter(routes);

export default router;