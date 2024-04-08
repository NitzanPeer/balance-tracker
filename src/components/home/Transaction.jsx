import React from "react";

export default function Transaction({ transaction, handleRemoveTransaction }) {
  let transactionDate;
  // Check if `transaction.date` is a Firebase Timestamp
  if (transaction.date && transaction.date.seconds) {
    transactionDate = new Date(transaction.date.seconds * 1000); // Convert to JavaScript Date object
  } else {
    transactionDate = new Date(); // Default to current date if no valid date is provided
  }

  const formattedDate = transactionDate.toLocaleDateString("en-GB"); // 'en-GB' for dd/mm/yyyy format
  const isHebrew = transaction.title.match(/[\u0590-\u05FF]/); // checks if title is in hebrew so the text-overflow: ellipsis knows which direction to show

  return (
    <li key={transaction.id} className="transaction">
      <div
        className="transaction-title"
        title={transaction.title}
        style={{ direction: isHebrew ? "rtl" : "ltr" }}
      >
        {transaction.title}
      </div>
      <div
        className={`transaction-sum ${
          transaction.category === "Income" ? "income-color" : "expense-color"
        }`}
      >
        {`₪${transaction.sum}`}
      </div>
      <div className="transaction-date">{formattedDate}</div>
      <button
        className="remove-transaction-btn"
        onClick={() => handleRemoveTransaction(transaction)}
      >
        x
      </button>
    </li>
  );
}