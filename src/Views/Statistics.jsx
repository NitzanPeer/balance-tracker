import React from "react";
import { Link } from "react-router-dom";
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
  // console.log("🚀 ~ Statistics ~ transactions:", transactions)

  const transactions = getTransactions();

  const groupByWeek = () => {
    const groupedData = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let weekOfMonth;

      if (date.getDate() <= 7) {
        weekOfMonth = 1;
      } else if (date.getDate() <= 14) {
        weekOfMonth = 2;
      } else if (date.getDate() <= 21) {
        weekOfMonth = 3;
      } else {
        weekOfMonth = 4;
      }

      // If the month has more than 28 days adjust weekOfMonth to be at most 4
      if (daysInMonth > 28) {
        weekOfMonth = Math.min(weekOfMonth, 4);
      }

      const weekLabel = `Week ${weekOfMonth}`;

      if (!groupedData[weekLabel]) {
        groupedData[weekLabel] = 0;
      }

      if (!transaction.isIncome) {
        groupedData[weekLabel] += parseFloat(transaction.sum);
      }
    });

    return groupedData;
  };

  const getWeek = (date) => {
    const d = new Date(date);
    const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    const weekNumber = Math.ceil(
      (d.getDate() - firstDayOfMonth.getDate() + 1) / 7
    );
    return weekNumber;
  };

  const createChartData = () => {
    const groupedData = groupByWeek();
    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);
    return { labels, data };
  };

  const { labels, data } = createChartData();
  // console.log("🚀 ~ Statistics ~ labels:", labels);
  // console.log("🚀 ~ Statistics ~ data:", data);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "This Month",
        data: data,
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Last Month",
        data: [3, 7, 3, 4],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div className="statistics container">
      <h1>Statistics Baby</h1>
      <div>
        <Bar className="chart" data={chartData} options={options}></Bar>
      </div>
      <Link to="/" title="Back to home page">
        <FontAwesomeIcon className="font-awesome-icon" icon={faCircleLeft} />
      </Link>
    </div>
  );
}
