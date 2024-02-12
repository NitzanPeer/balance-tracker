import React from "react";
import { useState, useEffect } from "react";
import Transaction from "./Transaction";

export default function TransactionTable({
  transactions,
  handleRemoveTransaction,
}) {
  const [filterType, setFilterType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isClicked, setClicked] = useState(filterType === "all");

  const handleFilterChange = (type) => {
    setClicked(type === "all");
    setFilterType(type);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // a function the sort uses to sort transactions by date
  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  };

  useEffect(() => {
    transactions.sort(compareDates);
  }, [transactions]);

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filterType === "all") {
        return true;
      } else if (filterType === "income") {
        return transaction.isIncome;
      } else {
        return !transaction.isIncome;
      }
    })
    .filter((transaction) => {
      if (!selectedMonth) {
        return true; // If no month is selected, show all transactions
      } else {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth() + 1; // Month is 0-based
        return transactionMonth === parseInt(selectedMonth);
      }
    });

  return (
    <div className="transaction-table">
      <div className="filter-btns-container">
        <button
          className={`${filterType === "all" ? "clicked" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`${filterType === "income" ? "clicked" : ""}`}
          onClick={() => handleFilterChange("income")}
        >
          Income
        </button>
        <button
          className={`${filterType === "expense" ? "clicked" : ""}`}
          onClick={() => handleFilterChange("expense")}
        >
          Expense
        </button>
      </div>

      <div className="month-filter container">
        <label htmlFor="monthInput">Search By Month:</label>
        <input
          type="number"
          id="monthInput"
          min="1"
          max="12"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>

      <ul className="transaction-list clean-list">
        {filteredTransactions.map((transaction, index) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            handleRemoveTransaction={handleRemoveTransaction}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}
