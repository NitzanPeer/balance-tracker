import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      404 Not Found
      {/* this link refreshes the page before moving to it:*/}
      <Link to="/">Home</Link>
      {/* this link doesn't refresh the page before moving to it:*/}
      {/* <a href="/">Home from a</a> */}
    </div>
  );
}
