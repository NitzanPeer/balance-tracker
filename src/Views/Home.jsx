import { useState, useEffect } from "react";
import "../assets/styles/main.scss";
import Header from "../components/Header";
import Balance from "../components/Balance";
import IncomeExpense from "../components/IncomeExpense";
import TransactionTable from "../components/TransactionTable";
import ButtonRow from "../components/ButtonRow";
import AddTransactionModal from "../components/AddTransactionModal";
import {
  getTransactions,
  addTransaction,
  removeTransaction,
} from "../services/transactionService";


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const savedTransactions = getTransactions();
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.isIncome) {
        income += parseFloat(transaction.sum);
      } else {
        expense += parseFloat(transaction.sum);
      }
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = addTransaction(transactions, newTransaction);
    setTransactions(updatedTransactions);
    closeModal();
  };

  const handleRemoveTransaction = (id) => {
    const conf = confirm("Delete this transaction?");
    if (conf) {
      removeTransaction(transactions, id);
      const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      setTransactions(updatedTransactions);
    }
  };

  return (
    <div className="home">
      {/* <Header /> */}
      <Balance balance={balance} />
      <IncomeExpense totalIncome={totalIncome} totalExpense={totalExpense} />
      <ButtonRow openModal={openModal} />
      <TransactionTable
        transactions={transactions}
        handleRemoveTransaction={handleRemoveTransaction}
      />
      {isModalOpen && (
        <AddTransactionModal
          transactions={transactions}
          setTransactions={setTransactions}
          closeModal={closeModal}
          handleAddTransaction={handleAddTransaction}
        />
      )}
    </div>
  );
}
