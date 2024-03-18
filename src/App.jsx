import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import Statistics from "./views/Statistics";
import NotFoundPage from "./views/NotFoundPage";
import AuthForm from "./components/AuthForm";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<AuthForm signUpOrSignIn="Sign In" setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<AuthForm signUpOrSignIn="Sign Up" setCurrentUser={setCurrentUser} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );

  // return (
  //   <Router>
  //     <AuthContextProvider>
  //       <Routes>
  //         <Route path="/" element={<AuthForm signUpOrSignIn="Sign In" setCurrentUser={setCurrentUser} />} />
  //         <Route path="/signup" element={<AuthForm signUpOrSignIn="Sign Up" setCurrentUser={setCurrentUser} />} />
  //         <Route path="/home" element={<ProtectedRoute component={<Home />} currentUser={currentUser} />} />
  //         <Route path="/statistics" element={<ProtectedRoute component={<Statistics />} currentUser={currentUser} />} />
  //         <Route path="*" element={<NotFoundPage />} />
  //       </Routes>
  //     </AuthContextProvider>
  //   </Router>
  // );
}