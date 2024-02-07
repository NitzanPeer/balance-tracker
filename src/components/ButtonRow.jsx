import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

export default function ButtonRow({ openModal }) {
  return (
    <div className="btn-row-container">
      <button className="add-transaction-btn" onClick={openModal}>
        Add Income/Expense
      </button>
      <Link to="/statistics" title="Statistics">
        <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
      </Link>
    </div>
  );
}
