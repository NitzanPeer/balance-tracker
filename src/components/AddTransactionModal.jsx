import React from "react";
import { useState } from "react";
import { generateId } from "../services/utilService";

export default function AddTransaction({
  transactions,
  setTransactions,
  closeModal,
  handleAddTransaction,
}) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
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
            className="title-input"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="sum-input"
            type="number"
            placeholder="Sum"
            onChange={(e) => setSum(e.target.value)}
          />
          <div className="category-container">
            <div>
              <input
                className="category-input"
                type="radio"
                name="category"
                value="Income"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>
            <div>
              <input
                className="category-input"
                type="radio"
                name="category"
                value="Expense"
                checked="checked"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
            </div>
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
