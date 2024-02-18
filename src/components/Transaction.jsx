import React from "react";

export default function Transaction({ transaction, handleRemoveTransaction }) {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-GB"); // 'en-GB' for dd/mm/yyyy format
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
      {/* remove btn for dev needs: */}
      {/* <button onClick={() => handleRemoveTransaction(transaction.id)}>-</button> */}
    </li>
  );
}
