import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/main.scss";

// import Header from "../components/Header";
import Balance from "../components/home/Balance";
import IncomeExpense from "../components/home/IncomeExpense";
import TransactionTable from "../components/home/TransactionTable";
import ButtonRow from "../components/home/ButtonRow";
import AddTransactionModal from "../components/home/AddTransactionModal";
import Footer from "../components/Footer";

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
      <div className="top container">
        <Link className="statistics-btn" to="/statistics" title="Statistics">
          <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
        </Link>
      </div>
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
      <Footer />
    </div>
  );
}
