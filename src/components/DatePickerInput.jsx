export default function DatePicker({
  inputNum,
  selectedYear,
  selectedMonth,
  handleMonthChange,
}) {
  return (
    <div className={`bar${inputNum}-inputs container`}>
      <input
        className={`date-picker${inputNum}`}
        type="month"
        id="monthInput"
        name="start"
        min="2024-01"
        value={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`}
        onChange={(e) => handleMonthChange(inputNum, e)}
      />
    </div>
  );
}
