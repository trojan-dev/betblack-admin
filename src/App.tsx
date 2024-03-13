import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TournamentsPage from "./pages/TournamentsPage";
import PrivateRoutes from "./routes/PrivateRoutes";

const router = createBrowserRouter([
  {
    element: <LoginPage />,
    path: "/login",
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <HomePage />,
        path: "/",
        children: [
          {
            element: <TournamentsPage />,
            index: true,
          },
          {
            element: <TournamentsPage />,
            path: "/tournaments",
          },
        ],
      },
    ],
  },
]);

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
