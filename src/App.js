import "./App.css";
import Error from "./Components/Error/Error";
import SplashScreen1 from "./Components/Splash screens/SplashScreen1/SplashScreen1";
import SplashScreen2 from "./Components/Splash screens/SplashScreen2/SplashScreen2";
import SplashScreen3 from "./Components/Splash screens/SplashScreen3/SplashScreen3";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign Up/SignUp";
import Home from "./Components/Home/Home";
import ResetPassword1 from "./Components/ResetPassword/ResetPassword1/ResetPassword1";
import ResetPassword2 from "./Components/ResetPassword/ResetPassword2/ResetPassword2";
import ResetPassword3 from "./Components/ResetPassword/ResetPassword3/ResetPassword3";
import ResetPassword4 from "./Components/ResetPassword/ResetPassword4/ResetPassword4";
import Success from "./Components/Success/Success";
import BorrowedBooksPage from "./Components/BorrowedBookFolder/BorrowedBooksPage/BorrowedBooksPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SplashScreen1 />,
      errorElement: <Error />,
    },
    {
      path: "/splashScreen2",

      element: <SplashScreen2 />,
    },
    {
      path: "/splashScreen3",
      element: <SplashScreen3 />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/resetPassword1",
      element: <ResetPassword1 />,
    },
    {
      path: "/resetPassword2",
      element: <ResetPassword2 />,
    },
    {
      path: "/resetPassword3",
      element: <ResetPassword3 />,
    },
    {
      path: "/resetPassword4",
      element: <ResetPassword4 />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/borrowedBooksPage",
      element: <BorrowedBooksPage />,
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
