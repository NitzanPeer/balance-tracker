import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <h2>404 Not Found</h2>

      {/* this link refreshes the page before moving to it:*/}
      <Link to="/home">Back to Home page</Link>

      {/* this link doesn't refresh the page before moving to it:*/}
      {/* <a href="/">Home from a</a> */}
    </div>
  );
}
