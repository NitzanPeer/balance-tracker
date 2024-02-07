import React from 'react'
import { useState } from 'react'
import Transaction from './Transaction'

export default function TransactionList({ transactions, handleRemoveTransaction }) {

    const [filterType, setFilterType] = useState('all')
    const [isClicked, setClicked] = useState(filterType === 'all')

    const handleFilterChange = (type) => {
        setClicked(type === 'all')
        setFilterType(type)
    }

    const filteredTransactions = transactions.filter(transaction => {
        if (filterType === 'all') {
            return true
        } else if (filterType === 'income') {
            return transaction.isIncome
        } else {
            return !transaction.isIncome
        }
    })

    return (
        <div className="transaction-table">
            <div className="filter-btns-container">
                <button className={`${filterType === 'all' ? 'clicked' : ''}`} onClick={() => handleFilterChange('all')}>All</button>
                <button className={`${filterType === 'income' ? 'clicked' : ''}`} onClick={() => handleFilterChange('income')}>Income</button>
                <button className={`${filterType === 'expense' ? 'clicked' : ''}`} onClick={() => handleFilterChange('expense')}>Expense</button>
            </div>
            <ul className="transaction-list clean-list">
                {filteredTransactions.map((transaction, index) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                        handleRemoveTransaction={handleRemoveTransaction}
                        index={index}
                        />
                ))}
            </ul>
        </div>
    )
}