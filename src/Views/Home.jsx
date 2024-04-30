import { useState, useEffect } from "react";
import AuthHeader from "../components/AuthHeader";
import Balance from "../components/home/Balance";
import IncomeExpense from "../components/home/IncomeExpense";
import TransactionTable from "../components/home/TransactionTable";
import ButtonRow from "../components/home/ButtonRow";
import AddTransactionModal from "../components/home/AddTransactionModal";
import Footer from "../components/Footer";
import MonthPicker from "../components/home/MonthPicker"
import { compareDates, getCurrentMonth } from "../services/utilService";
import {
  getTransactions,
  addTransaction,
  removeTransaction,
  filterTransactionsByMonth,
} from "../services/transactionService";
import { useAuth } from "../hooks/AuthHook";

export default function Home({ transactions, setTransactions, isLoading }) {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [transactionsByMonth, setTransactionsByMonth] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    setTransactionsByMonth(filterTransactionsByMonth(transactions, selectedMonth).sort(compareDates));
    console.log(transactions)
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

  const handleAddTransaction = async (newTransaction) => {
    // Add the transaction to the DB
    await addTransaction(user.uid, transactions, newTransaction);
    closeModal();

    // Fetch the now updated transactions from the DB and update the state
    const updatedTransactionsFromDB = await getTransactions(user.uid);
    setTransactions(updatedTransactionsFromDB);
  };

  const handleRemoveTransaction = async (transactionToDelete) => {
    const conf = confirm("Delete this transaction?");
    if (conf) {
      removeTransaction(user.uid, transactionToDelete);
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== transactionToDelete.id);
      setTransactions(updatedTransactions);
    }
  };

  return (
    <div className="home">
      {isLoading ? <div>Loading...</div> :
        <>
          <AuthHeader setTransactions={setTransactions} isHome={true} />
          <MonthPicker selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
          <Balance balance={balance} />
          <IncomeExpense totalIncome={totalIncome} totalExpense={totalExpense} />
          <ButtonRow openModal={openModal} />
          <TransactionTable
            transactionsByMonth={transactionsByMonth}
            handleRemoveTransaction={handleRemoveTransaction}
            selectedMonth={selectedMonth}
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
        </>
      }
    </div>
  );
}
