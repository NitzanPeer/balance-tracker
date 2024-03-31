import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AuthDetails from "./AuthDetails";

export default function AuthHeader({ setTransactions, isHome }) {
  return (
    <div className="auth-header container">
      {isHome?
      <>
        <AuthDetails setTransactions={setTransactions} />
        <Link className="statistics-btn" to="/statistics" title="Statistics">
          <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
        </Link>
      </>
      :
      <>
        <AuthDetails />
        <Link className="back-btn" to="/home" title="Back to Home page">
          <FontAwesomeIcon className="font-awesome-icon" icon={faCircleLeft} />
        </Link>
      </>
      }
    </div>
  );
}