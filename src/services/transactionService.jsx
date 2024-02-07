import { saveToLocalStorage, loadFromLocalStorage } from "./utilService";

const TRANSACTIONS_KEY = "transactions";

export function getTransactions() {
  const transactions = loadFromLocalStorage(TRANSACTIONS_KEY);
  return transactions || [];
}

export function addTransaction(transactions, newTransaction) {
  const updatedTransactions = [...transactions, newTransaction];
  saveToLocalStorage(TRANSACTIONS_KEY, updatedTransactions);
  return updatedTransactions;
}

export function removeTransaction(transactions, id) {
  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  saveToLocalStorage(TRANSACTIONS_KEY, updatedTransactions);
  return updatedTransactions;
}

export function updateTransaction(transactions, updatedTransaction) {
  const index = transactions.findIndex(
    (transaction) => transaction.id === updatedTransaction.id
  );

  if (index === -1) {
    // If no transaction found, return the original transactions array
    return transactions;
  }

  const updatedTransactions = [
    ...transactions.slice(0, index),
    updatedTransaction,
    ...transactions.slice(index + 1),
  ];

  saveToLocalStorage(TRANSACTIONS_KEY, updatedTransactions);

  return updatedTransactions;
}
