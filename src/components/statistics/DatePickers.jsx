import DatePickerInput from "../DatePickerInput";

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
          selectedYear={selectedYear1}
          selectedMonth={selectedMonth1}
          handleMonthChange={handleMonthChange}
          inputNum={1}
        />

        <div className="monthly-sum-wrapper">
        <h5>{`Total Expenses: ₪${monthlySum1}`}</h5>
        </div>
      </div>

      <div className="date-picker-wrapper">
        <DatePickerInput
          selectedYear={selectedYear2}
          selectedMonth={selectedMonth2}
          handleMonthChange={handleMonthChange}
          inputNum={2}
        />
        <div className="monthly-sum-wrapper">
          <h5>{`Total Expenses: ₪${monthlySum2}`}</h5>
        </div>
      </div>
    </div>
  );
}
