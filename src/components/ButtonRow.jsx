import React, { useState } from "react";

export default function ButtonRow({ openModal }) {
  function exportData() {
    const dataString = localStorage.getItem("transactions"); // Retrieve data from local storage
    const blob = new Blob([dataString], { type: "application/json" }); // Create a blob from the JSON data
    const url = URL.createObjectURL(blob); // Create URL for the blob

    // Create a link element to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = "yourData.json"; // Set the file name
    document.body.appendChild(a);
    a.click(); // Simulate a click event to download the file
    document.body.removeChild(a); // Remove the link element
  }

  // Import data function
  function importData(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const importedData = JSON.parse(event.target.result);
        localStorage.setItem("transactions", JSON.stringify(importedData));
        alert("Data imported successfully!");
      } catch (error) {
        console.error("Error importing data:", error);
      }
    };

    reader.readAsText(file); // Read the contents of the file
  }

  return (
    <div className="btn-row-container container">
      <button className="add-transaction-btn" onClick={openModal}>
        Add Income/Expense
      </button>

      {/* <div>
        <button onClick={exportData}>Export Data</button>
        <input type="file" accept=".json" onChange={importData} />
      </div> */}
    </div>
  );
}
