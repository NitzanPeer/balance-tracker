import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

export default function DatePicker({ selectedYear, selectedMonth, handleMonthChange, inputNum }) {
  return (
    <div className={`date-picker${inputNum} container`}>
      <input
        className={`date-picker-input${inputNum} noselect`}
        type="month"
        id="monthInput"
        name="start"
        min="2024-01"
        value={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`}
        onChange={(e) => handleMonthChange(inputNum, e)}
      />
      <FontAwesomeIcon className="font-awesome-icon" icon={faCalendar} />
    </div>
  );
}
