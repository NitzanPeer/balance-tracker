import React from "react";
import { useState, useEffect } from "react";
import Transaction from "./Transaction";
import FilterBtn from "../FilterBtn";

export default function TransactionTable({ transactionsByMonth, handleRemoveTransaction, selectedMonth, setSelectedMonth }) {

  const [filterType, setFilterType] = useState("all");

  const handleChange = (changeType, e = null, filterType = null) => {
    if (changeType === "month") setSelectedMonth(e.target.value);
    else if (changeType === "filter") setFilterType(filterType);
  };

  const transactionsByMonthAndFilter = transactionsByMonth
  .filter((transaction) => {
    if (filterType === "all") {
      return true;
    } else if (filterType === "income") {
      return transaction.isIncome;
    } else {
      return !transaction.isIncome;
    }
  })

  return (
    <div className="transaction-table container">
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


      <ul className="transaction-list clean-list">
        {transactionsByMonthAndFilter.map((transaction, index) => (
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

