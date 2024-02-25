import DatePickerInput from "../DatePickerInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function DatePickers({
  selectedYear1,
  selectedMonth1,
  selectedYear2,
  selectedMonth2,
  monthlySum1,
  monthlySum2,
  handleMonthChange,
}) {
  return (
    <div className="date-pickers container">
      <div className="date-picker-wrapper">
        <DatePickerInput
          inputNum={1}
          selectedYear={selectedYear1}
          selectedMonth={selectedMonth1}
          handleMonthChange={handleMonthChange}
        />
        
        {/* <FontAwesomeIcon className="font-awesome-icon" icon={faChevronDown} /> */}
        <div className="monthly-sum-wrapper">
        <h5>{`Total Expenses: ₪${monthlySum1}`}</h5>
        </div>
      </div>

      <div className="date-picker-wrapper">
        <DatePickerInput
          inputNum={2}
          selectedYear={selectedYear2}
          selectedMonth={selectedMonth2}
          handleMonthChange={handleMonthChange}
        />
        {/* <FontAwesomeIcon className="font-awesome-icon" icon={faChevronDown} /> */}
        <div className="monthly-sum-wrapper">
          <h5>{`Total Expenses: ₪${monthlySum2}`}</h5>
        </div>
      </div>
    </div>
  );
}
