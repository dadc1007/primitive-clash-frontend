import { MainLayout, RootLayout } from "@layouts";
import { CardsPage, GamePage, HomePage, LobbyPage } from "@pages";
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
      {
        element: <MainLayout />,
        children: [
          { path: "/lobby", element: <LobbyPage /> },
          { path: "/collection", element: <CardsPage /> },
        ],
      },
      { path: "/game", element: <GamePage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
