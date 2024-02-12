import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getTransactions } from "../services/transactionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Statistics() {
  const transactions = getTransactions();

  const getExpenseSumsByWeek = (year, month, transactions) => {
    const expenseSums = [0, 0, 0, 0];

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month - 1 && // Month is 0-based
        !transaction.isIncome // Exclude incomes
      ) {
        const dayOfMonth = transactionDate.getDate();
        if (dayOfMonth <= 7) {
          expenseSums[0] += parseFloat(transaction.sum);
        } else if (dayOfMonth <= 14) {
          expenseSums[1] += parseFloat(transaction.sum);
        } else if (dayOfMonth <= 21) {
          expenseSums[2] += parseFloat(transaction.sum);
        } else {
          expenseSums[3] += parseFloat(transaction.sum);
        }
      }
    });

    return expenseSums;
  };

  const [selectedYear1, setSelectedYear1] = useState(new Date().getFullYear());
  const [selectedMonth1, setSelectedMonth1] = useState(
    new Date().getMonth() + 1
  );
  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());
  const [selectedMonth2, setSelectedMonth2] = useState(
    new Date().getMonth() + 1
  );

  const handleYearChange1 = (e) => {
    setSelectedYear1(parseInt(e.target.value));
  };

  const handleMonthChange1 = (e) => {
    setSelectedMonth1(parseInt(e.target.value));
  };

  const handleYearChange2 = (e) => {
    setSelectedYear2(parseInt(e.target.value));
  };

  const handleMonthChange2 = (e) => {
    setSelectedMonth2(parseInt(e.target.value));
  };

  const createChartData = () => {
    const label1 = `${String(selectedMonth1).padStart(2,"0")}/${selectedYear1}`;
    const label2 = `${String(selectedMonth2).padStart(2,"0")}/${selectedYear2}`;

    const data1 = getExpenseSumsByWeek(
      selectedYear1,
      selectedMonth1,
      transactions
    );

    const data2 = getExpenseSumsByWeek(
      selectedYear2,
      selectedMonth2,
      transactions
    );

    return { label1, label2, data1, data2 };
  };

  const { data1, data2, label1, label2 } = createChartData();

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: label1,
        data: data1,
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: label2,
        data: data2,
        backgroundColor: "orange",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div className="statistics container">
      <div className="header-container">
        <h1>Statistics Baby</h1>
        <div>(Expenses only)</div>
      </div>
      <div className="bar1 container">
        <label className="year-label" htmlFor="yearInput">
          Year:
        </label>
        <input
          type="number"
          className="year-input"
          value={selectedYear1}
          onChange={handleYearChange1}
        />
        <label className="month-label" htmlFor="monthInput">
          Month:
        </label>
        <input
          type="number"
          className="month-input"
          value={selectedMonth1}
          onChange={handleMonthChange1}
        />
      </div>
      <div className="bar2 container">
        <label className="year-label" htmlFor="yearInput">
          Year:
        </label>
        <input
          className="year-input"
          type="number"
          value={selectedYear2}
          onChange={handleYearChange2}
        />
        <label className="month-label" htmlFor="monthInput">
          Month:
        </label>
        <input
          type="number"
          className="month-input"
          value={selectedMonth2}
          onChange={handleMonthChange2}
        />
      </div>
      <div>
        <Bar className="chart" data={chartData} options={options}></Bar>
      </div>
      <Link to="/" title="Back to Home page">
        <FontAwesomeIcon className="font-awesome-icon" icon={faCircleLeft} />
      </Link>
    </div>
  );
}
