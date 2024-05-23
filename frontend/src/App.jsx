import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [expense, setExpense] = useState('');
  const [income, setIncome] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

  useEffect(() => {
    // Fetch expenses and income from the backend
    const fetchExpensesAndIncome = async () => {
      const expensesResponse = await axios.get('http://localhost:5000/expenses');
      setExpenseHistory(expensesResponse.data);

      const incomeResponse = await axios.get('http://localhost:5000/incomes');
      setIncomeHistory(incomeResponse.data);
      
      // Calculate the final amount
      const totalExpenses = expensesResponse.data.reduce((acc, expense) => acc + expense.amount, 0);
      const totalIncome = incomeResponse.data.reduce((acc, income) => acc + income.amount, 0);
      setFinalAmount(totalIncome - totalExpenses);
    };

    fetchExpensesAndIncome();
  }, []);

  const handleExpenseChange = (e) => {
    setExpense(e.target.value);
  };

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleExpenseDescriptionChange = (e) => {
    setExpenseDescription(e.target.value);
  };

  const handleIncomeDescriptionChange = (e) => {
    setIncomeDescription(e.target.value);
  };

  const handleAddExpense = async () => {
    const expenseValue = parseFloat(expense);
    if (!isNaN(expenseValue)) {
      const newExpense = { amount: expenseValue, description: expenseDescription, date: new Date().toLocaleString() };
      await axios.post('http://localhost:5000/expenses', newExpense);
      setExpenseHistory([...expenseHistory, newExpense]);
      setFinalAmount(finalAmount - expenseValue);
      setExpense('');
      setExpenseDescription('');
    }
  };

  const handleAddIncome = async () => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      const newIncome = { amount: incomeValue, description: incomeDescription, date: new Date().toLocaleString() };
      await axios.post('http://localhost:5000/incomes', newIncome);
      setIncomeHistory([...incomeHistory, newIncome]);
      setFinalAmount(finalAmount + incomeValue);
      setIncome('');
      setIncomeDescription('');
    }
  };

  return (
    <>
      <div>
        <h2>Final Amount: {finalAmount}</h2>
      </div>

      <h2>Expense History</h2>
      <ul>
        {expenseHistory.map((expense, index) => (
          <li key={index}>
            Amount: {expense.amount} - Description: {expense.description} - Date: {expense.date}
          </li>
        ))}
      </ul>
      <h2>Income History</h2>
      <ul>
        {incomeHistory.map((income, index) => (
          <li key={index}>
            Amount: {income.amount} - Description: {income.description} - Date: {income.date}
          </li>
        ))}
      </ul>

      <input type="text" placeholder="Enter Amount" value={expense} onChange={handleExpenseChange} />
      <label>Expense</label>
      <input type="text" placeholder="Add Description" value={expenseDescription} onChange={handleExpenseDescriptionChange} />
      <button onClick={handleAddExpense}>Add</button>

      <input type="text" placeholder="Enter Amount" value={income} onChange={handleIncomeChange} />
      <label>Income</label>
      <input type="text" placeholder="Add Description" value={incomeDescription} onChange={handleIncomeDescriptionChange} />
      <button onClick={handleAddIncome}>Add</button>

      <h1>Expense Tracker by Sourav Mohanta</h1>
    </>
  );
}

export default App;
