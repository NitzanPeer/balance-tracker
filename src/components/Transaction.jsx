import React from "react";

export default function Transaction({ transaction, handleRemoveTransaction }) {
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-GB"); // 'en-GB' for dd/mm/yyyy format

  return (
    <li key={transaction.id} className="transaction">
      <div
        className={`ball ${
          transaction.category === "Income"
            ? "income-background"
            : "expense-background"
        }`}
      ></div>
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
