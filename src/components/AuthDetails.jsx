import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth); // signing out with firebase
      setAuthUser(null); // reseting the user to null so another can log in
      navigate("/");
      console.log("User Signed Out");
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
    }
  };

  return (
    <div className="hi-user-msg-container">
      {authUser ? (
        <>
          <p>{`Hi ${authUser.email}!`}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
}
