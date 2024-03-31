import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import Statistics from "./views/Statistics";
import NotFoundPage from "./views/NotFoundPage";
import AuthForm from "./components/AuthForm";
import {
  getTransactions,
} from "./services/transactionService";
import { useAuth } from "./hooks/AuthHook";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const getTransactionsByUser = async () => {
      if (user) {
        const transactionsFromDB = await getTransactions(user.uid);
        setTransactions(transactionsFromDB);
        setIsLoading(false);
      } else {
        setTransactions([]); // Clear transactions when there's no user
      }
    };

    getTransactionsByUser();

    return () => {
      // Clear transactions when the component unmounts or user changes
      setTransactions([]);
    };
  }, [user]);


  return (

    <Router>
      <Routes>
        <Route path="/" element={<AuthForm signUpOrSignIn="Sign In" />} />
        <Route path="/signup" element={<AuthForm signUpOrSignIn="Sign Up" />} />
        <Route path="/home" element={<Home transactions={transactions} setTransactions={setTransactions} isLoading={isLoading} />} />
        <Route path="/statistics" element={<Statistics transactions={transactions} isLoading={isLoading} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
