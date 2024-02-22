import React from "react";
import StatisticsHeader from "../components/statistics/StatisticsHeader";
import Footer from "../components/Footer";
import DatePickers from "../components/statistics/DatePickers";
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
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

export default function Statistics() {
  const transactions = getTransactions();

  const getExpenseSumsByWeek = (
    year,
    month,
    transactions,
    includeIncome = false
  ) => {
    const expenseSums = [0, 0, 0, 0];

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month - 1 && // Month is 0-based
        (includeIncome || !transaction.isIncome) // Exclude incomes
      ) {
        const dayOfMonth = transactionDate.getDate();
        let sum = parseFloat(transaction.sum);

        let index = Math.max(Math.ceil(dayOfMonth / 7) - 1);
        if (index > 3) index = 3;
        expenseSums[index] += sum;
      }
    });

    return expenseSums;
  };

  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;

  // Calculate the last month
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const lastMonthsYear = currentDate.getFullYear();
  const lastMonth = currentDate.getMonth() + 1;

  const [selectedYear1, setSelectedYear1] = useState(currYear);
  const [selectedMonth1, setSelectedMonth1] = useState(currMonth);
  const [selectedYear2, setSelectedYear2] = useState(lastMonthsYear);
  const [selectedMonth2, setSelectedMonth2] = useState(lastMonth);

  const handleMonthChange = (inputNum, e) => {
    const selectedValue = e.target.value;
    const selectedMonth = parseInt(selectedValue.substring(5, 7));
    const selectedYear = parseInt(selectedValue.substring(0, 4));

    if (inputNum === 1) {
      setSelectedMonth1(selectedMonth);
      setSelectedYear1(selectedYear);
    } else {
      setSelectedMonth2(selectedMonth);
      setSelectedYear2(selectedYear);
    }
  };

  const createChartData = () => {
    const label1 = `${String(selectedMonth1).padStart(
      2,
      "0"
    )}/${selectedYear1}`;
    const label2 = `${String(selectedMonth2).padStart(
      2,
      "0"
    )}/${selectedYear2}`;

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
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
      {
        label: label2,
        data: data2,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 159, 64)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    datalabels: {
      display: true,
      color: "white",
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="statistics">
      <div className="top container">
        <Link className="back-btn" to="/" title="Back to Home page">
          <FontAwesomeIcon className="font-awesome-icon" icon={faCircleLeft} />
        </Link>
      </div>
      <StatisticsHeader/>
      <DatePickers
      selectedYear1={selectedYear1}
      selectedMonth1={selectedMonth1}
      selectedYear2={selectedYear2}
      selectedMonth2={selectedMonth2}
      handleMonthChange={handleMonthChange}/>
      <div className="bar-chart-container container">
        <Bar
          className="bar-chart"
          data={chartData}
          plugins={[ChartDataLabels]}
          options={options}
          height={220}
        />
      </div>
      {/* <div className="doughnut-chart-container">
        <Doughnut className="doughnut-chart" data={chartData} options={options}/>
      </div> */}
      <Footer />
    </div>
  );
}
