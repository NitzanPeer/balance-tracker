import { saveToLocalStorage, loadFromLocalStorage } from "./utilService";

const TRANSACTIONS_KEY = "transactions";

export function getTransactions() {
  const transactions = loadFromLocalStorage(TRANSACTIONS_KEY);
  return transactions || [];
}

export function saveTransactions(transactions) {
  saveToLocalStorage(TRANSACTIONS_KEY, transactions);
  return transactions
}

export function addTransaction(transactions, newTransaction) {
  const updatedTransactions = [...transactions, newTransaction];
  saveTransactions(updatedTransactions)
  return updatedTransactions;
}

export function removeTransaction(transactions, id) {
  const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
  saveTransactions(updatedTransactions)
  return updatedTransactions;
}

export function updateTransaction(transactions, updatedTransaction) {
  const index = transactions.findIndex((transaction) => transaction.id === updatedTransaction.id);

  if (index === -1) {
    // If no transaction found, return the original transactions array
    return transactions;
  }

  const updatedTransactions = [
    ...transactions.slice(0, index),
    updatedTransaction,
    ...transactions.slice(index + 1),
  ];

  saveTransactions(updatedTransactions)
  return updatedTransactions;
}

export function filterTransactionsByMonth(transactions, selectedMonth) {
  if (!selectedMonth) {
    return transactions; // If no month is selected, return all transactions
  } else {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth() + 1; // Month is 0-based
      return transactionMonth === parseInt(selectedMonth.substring(5, 7));
    });
  }
}