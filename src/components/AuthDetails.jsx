import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveTransactions, getTransactions } from "../services/transactionService";
import guestdata from "../../guestdata.json";

import { useAuth } from "../hooks/AuthHook";

export default function AuthDetails({ setTransactions }) {
  const { user, isGuestUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await logout(); // signing out with firebase
      navigate("/");
      console.log("User Signed Out");
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
    }
  };

  const handleResetData = async (e) => {
    e.preventDefault();
    const conf = confirm("Are you sure you want to reset guest transactions?")
    if(conf) {
      try {
        // navigate("/home");

        saveTransactions(user.uid, guestdata);
        setTransactions(guestdata);

        console.log("User Signed Out");
      } catch (error) {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
      }
    }

  };

  return (
    <div className="hi-user-msg-container">
      {user ? (
        <>
          <p>{`Hi ${user.email}!`}</p>
          <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
          {isGuestUser && <button className="reset-btn" onClick={handleResetData}>Reset Data</button>}
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
