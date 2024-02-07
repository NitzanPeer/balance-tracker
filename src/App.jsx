import { useState, useEffect } from 'react'

import './assets/styles/main.scss'
import Header from './components/Header'
import Balance from './components/Balance'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'
import AddTransactionModal from './components/addTransactionModal'
import { getTransactions, addTransaction, removeTransaction } from './services/transactionService'


function App() {

  const [transactions, setTransactions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const savedTransactions = getTransactions()
    setTransactions(savedTransactions)
  }, [])

  useEffect(() => {
    let income = 0
    let expense = 0
    transactions.forEach(transaction => {
      if (transaction.isIncome) {
        income += parseFloat(transaction.sum)
      } else {
        expense += parseFloat(transaction.sum)
      }
    })
    setTotalIncome(income)
    setTotalExpense(expense)
    setBalance(income-expense)
  }, [transactions])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = addTransaction(transactions, newTransaction)
    setTransactions(updatedTransactions)
    closeModal()
  }

  const handleRemoveTransaction = (id) => {
    const conf = confirm('Delete this transaction?')
    if(conf) {
      removeTransaction(transactions, id)
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id)
      setTransactions(updatedTransactions)
    }
  }

  return (
    < div className='app' >
      <Header />
      <div>
        <Balance balance={balance}/>
        <IncomeExpense totalIncome={totalIncome} totalExpense={totalExpense}/>
        <button className='add-transaction-btn' onClick={openModal}>Add Income/Expense</button>
        <TransactionList transactions={transactions} handleRemoveTransaction={handleRemoveTransaction} />
        {isModalOpen && (
          <AddTransactionModal
            transactions={transactions}
            setTransactions={setTransactions}
            closeModal={closeModal}
            handleAddTransaction={handleAddTransaction}
          />
          )}
      </div>
    </div>
  )
}
export default App