import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home.jsx";
import Statistics from "./views/Statistics.jsx";
import NotFoundPage from "./views/NotFoundPage.jsx";
import AuthForm from "./components/AuthForm.jsx"
import { AuthContextProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./assets/styles/main.scss";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <NotFoundPage />,
//   },
//   {
//     path: "statistics",
//     element: <Statistics />,
//     errorElement: <div>404 Not Found</div>,
//   },
//   {
//     path: "/signup",
//     element: <AuthForm signUpOrSignIn="Sign Up"/>,
//     errorElement: <NotFoundPage />,
//   },
//   {
//     path: "/signin",
//     element: <AuthForm signUpOrSignIn="Sign In"/>,
//     errorElement: <NotFoundPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </React.StrictMode>
);
