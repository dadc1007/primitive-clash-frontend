import { RootLayout } from "@layouts";
import { CardsPage, HomePage } from "@pages";
import { LoginPage } from "@pages/Auth/Login";
import { SignupPage } from "@pages/Auth/Signup";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/collection", element: <CardsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
