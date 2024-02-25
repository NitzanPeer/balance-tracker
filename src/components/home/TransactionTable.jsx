import React from "react";
import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import { compareDates } from "../../services/utilService";
import FilterBtn from "../FilterBtn";

export default function TransactionTable({ transactions, handleRemoveTransaction }) {
  const currYearStr = new Date().getFullYear().toString();
  const currMonthStr = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const currMonthAndYear = `${currYearStr}-${currMonthStr}`;

  const [filterType, setFilterType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(currMonthAndYear);

  const handleChange = (changeType, e = null, filterType = null) => {
    if (changeType === "month") setSelectedMonth(e.target.value);
    else if (changeType === "filter") setFilterType(filterType);
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
        return transactionMonth === parseInt(selectedMonth.substring(5, 7));
      }
    });

  return (
    <div className="transaction-table container">
      <div className="category-container container">
        <label>Category:</label>

        <div className="filter-btns-container">
          <FilterBtn filterType={"all"} currFilterType={filterType} handleChange={handleChange} />
          <FilterBtn
            filterType={"income"}
            currFilterType={filterType}
            handleChange={handleChange}
          />
          <FilterBtn
            filterType={"expense"}
            currFilterType={filterType}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="month-container container">
        <label>Month:</label>

        <div className="month-inner container">
          <div className="month-filter container">
            <input
              type="month"
              id="monthInput"
              name="start"
              min="2024-01"
              value={selectedMonth}
              onChange={(e) => handleChange("month", e)}
            />
          </div>
        </div>
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
