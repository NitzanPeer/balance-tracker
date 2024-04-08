export default function FilterBtn({ filterType, currFilterType, handleChange }) {
  return (
    <button
      className={`${currFilterType === filterType ? "clicked" : ""}`}
      onClick={() => handleChange(filterType)}
    >
      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
    </button>
  );
}
