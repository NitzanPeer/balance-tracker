import React from "react";
import StatisticsHeader from "../components/statistics/StatisticsHeader";
import Footer from "../components/Footer";
import AuthHeader from "../components/AuthHeader";
import DatePickers from "../components/statistics/DatePickers";
import { useState, useEffect } from "react";
import { getLastMonthProperties } from "../services/utilService";
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function Statistics({transactions, isLoading}) {

  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;
  const { lastMonthsYear, lastMonth } = getLastMonthProperties();

  const [selectedYear1, setSelectedYear1] = useState(currYear);
  const [selectedMonth1, setSelectedMonth1] = useState(currMonth);
  const [selectedYear2, setSelectedYear2] = useState(lastMonthsYear);
  const [selectedMonth2, setSelectedMonth2] = useState(lastMonth);
  const [monthlySum1, setMonthlySum1] = useState(0);
  const [weeklySums1, setWeeklySums1] = useState([]);
  const [monthlySum2, setMonthlySum2] = useState(0);
  const [weeklySums2, setWeeklySums2] = useState([]);

  useEffect(() => {
    // console.log('statistics transactions', transactions)
    const currentMonthData = getExpenseSums(currYear, currMonth, transactions);
    setMonthlySum1(currentMonthData.monthlyExpensesSum);
    setWeeklySums1(currentMonthData.weeklyExpensesSums);

    const previousMonthData = getExpenseSums(lastMonthsYear, lastMonth, transactions);
    setMonthlySum2(previousMonthData.monthlyExpensesSum);
    setWeeklySums2(previousMonthData.weeklyExpensesSums);
  }, [transactions]);

  const getExpenseSums = (year, month, transactions, includeIncome = false) => {
    let weeklyExpensesSums = [0, 0, 0, 0];
    let monthlyExpensesSum = 0;

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
        weeklyExpensesSums[index] += sum;
        monthlyExpensesSum += sum;
      }
    });

    return { monthlyExpensesSum, weeklyExpensesSums };
  };

  const handleMonthChange = (inputNum, e) => {
    const selectedValue = e.target.value;
    const selectedMonth = parseInt(selectedValue.substring(5, 7));
    const selectedYear = parseInt(selectedValue.substring(0, 4));

    const { monthlyExpensesSum, weeklyExpensesSums } = getExpenseSums(
      selectedYear,
      selectedMonth,
      transactions
    );

    if (inputNum === 1) {
      setMonthlySum1(monthlyExpensesSum);
      setWeeklySums1(weeklyExpensesSums);
      setSelectedMonth1(selectedMonth);
      setSelectedYear1(selectedYear);
    } else {
      setMonthlySum2(monthlyExpensesSum);
      setWeeklySums2(weeklyExpensesSums);
      setSelectedMonth2(selectedMonth);
      setSelectedYear2(selectedYear);
    }
  };

  const createChartData = () => {
    return {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: `${String(selectedMonth1).padStart(2, "0")}/${selectedYear1}`,
          data: weeklySums1,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgb(153, 102, 255)",
          borderWidth: 1,
        },
        {
          label: `${String(selectedMonth2).padStart(2, "0")}/${selectedYear2}`,
          data: weeklySums2,
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgb(255, 159, 64)",
          borderWidth: 1,
        },
      ],
    };
  };

  const createChartOptions = () => {
    return {
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
  };

  return (
    <div className="statistics">
      {isLoading ? <div>Loading...</div> :
        <>
        <AuthHeader isHome={false}/>
          <StatisticsHeader />
          <DatePickers
            selectedYear1={selectedYear1}
            selectedMonth1={selectedMonth1}
            selectedYear2={selectedYear2}
            selectedMonth2={selectedMonth2}
            monthlySum1={monthlySum1}
            monthlySum2={monthlySum2}
            handleMonthChange={handleMonthChange}
          />
          <div className="bar-chart-container container">
            <Bar
              className="bar-chart"
              data={createChartData()}
              plugins={[ChartDataLabels]}
              options={createChartOptions()}
              height={220}
            />
          </div>
        </>
      }
      {/* <div className="doughnut-chart-container">
        <Doughnut className="doughnut-chart" data={chartData} options={options}/>
      </div> */}
      <Footer />
    </div>
  );
}
