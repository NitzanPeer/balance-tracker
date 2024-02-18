import React from "react";
import { useState, useEffect } from "react";
import { generateId } from "../services/utilService";

export default function AddTransaction({
  closeModal,
  handleAddTransaction,
}) {
  const today = new Date().toISOString().substring(0, 10); // get a string of today's date to be used as default

  const [date, setDate] = useState(today);
  const [category, setCategory] = useState("Expense");
  const [sum, setSum] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!date || !sum) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const newTransaction = {
      id: generateId(),
      isIncome: category === "Income",
      title,
      date,
      category,
      sum,
    };
    handleAddTransaction(newTransaction);
  };

  return (
    <div className="modal-overlay">
      <div className="add-transaction-modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            X
          </span>
          <input
            className="sum-input"
            type="number"
            placeholder="Enter a sum"
            onChange={(e) => setSum(e.target.value)}
            required
          />
          <input
            className="title-input"
            type="text"
            placeholder="Enter a title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="category-container">
              <label className="category-status">{category}</label>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setCategory(e.target.checked ? "Income" : "Expense")
                  }
                  required
                />
                <span className="slider round"></span>
              </label>
          </div>
          <input
            className="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
