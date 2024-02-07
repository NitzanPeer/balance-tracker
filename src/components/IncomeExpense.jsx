import React from 'react'

export default function IncomeExpense({ totalIncome, totalExpense }) {
  return (
    <div className='income-expense container'>
        <div className='income'>
            <h4>Income</h4>
            <span>{`₪${totalIncome}`}</span>
        </div>
        <div className='expense'>
            <h4>Expense</h4>
            <span>{`₪${totalExpense}`}</span>
        </div>
    </div>
  )
}