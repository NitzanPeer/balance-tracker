import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

export default function MonthPicker({ selectedMonth, setSelectedMonth }) {
  const monthInputRef = useRef(null);

  const handleChange = (e = null) => {
    setSelectedMonth(e.target.value);
  };

  const handleIconClick = () => {
    monthInputRef.current.showPicker();
  };

  return (
    <div className="month-container container">
      <div className="month-inner container">
        <div className="month-filter container">
          <input
            ref={monthInputRef}
            className="noselect"
            type="month"
            id="monthInput"
            name="start"
            min="2024-01"
            value={selectedMonth}
            onChange={(e) => handleChange(e)}
          />
          <FontAwesomeIcon
            className="font-awesome-icon"
            icon={faCalendar}
            onClick={handleIconClick}
          />
        </div>
      </div>
    </div>
  );
}
