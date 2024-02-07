import React from "react";
import { Link } from "react-router-dom";

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

export default function Statistics({ transactions }) {
  const data = {
    labels: ["1", "2", "3", "4"],
    datasets: [
      {
        label: "369",
        data: [3, 15, 6, 9],
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "333",
        data: [3, 3, 3, 4, 3, 4, 5],
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
        <Bar className="chart" data={data} options={options}></Bar>
      </div>
      <Link to="/" title="Back to home page">
        <FontAwesomeIcon className="font-awesome-icon" icon={faCircleLeft} />
      </Link>
    </div>
  );
}
