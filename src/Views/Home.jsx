import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

// import Header from "../components/Header";
import Balance from "../components/home/Balance";
import IncomeExpense from "../components/home/IncomeExpense";
import TransactionTable from "../components/home/TransactionTable";
import ButtonRow from "../components/home/ButtonRow";
import AddTransactionModal from "../components/home/AddTransactionModal";
import Footer from "../components/Footer";
import AuthDetails from "../components/AuthDetails";
import { compareDates, getCurrentMonth } from "../services/utilService";
import { getTransactions, saveTransactions, addTransaction, removeTransaction, filterTransactionsByMonth } from "../services/transactionService";

export default function Home() {

  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [transactionsByMonth, setTransactionsByMonth] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const savedTransactions = getTransactions();
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {    //  this condition makes sure an empty array won't be saved in the local storage on every refresh
      saveTransactions(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    setTransactionsByMonth(filterTransactionsByMonth(transactions, selectedMonth).sort(compareDates));
  }, [selectedMonth, transactions]);

  useEffect(() => {
    let income = 0;
    let expense = 0;
    transactionsByMonth.forEach((transaction) => {
      if (transaction.isIncome) {
        income += parseFloat(transaction.sum);
      } else {
        expense += parseFloat(transaction.sum);
      }
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactionsByMonth]);

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
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
    }
  };


  return (
    <div className="home">
      <div className="top container">
        <AuthDetails/>
        <Link className="statistics-btn" to="/statistics" title="Statistics">
          <FontAwesomeIcon className="font-awesome-icon" icon={faChartSimple} />
        </Link>
      </div>
      {/* <Header /> */}
      <Balance balance={balance} />
      <IncomeExpense totalIncome={totalIncome} totalExpense={totalExpense} />
      <ButtonRow openModal={openModal} />
      <TransactionTable
        transactionsByMonth={transactionsByMonth}
        handleRemoveTransaction={handleRemoveTransaction}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
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

