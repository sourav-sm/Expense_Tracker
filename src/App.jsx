import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [expense, setExpense] = useState('');
  const [income, setIncome] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [incomeDescription, setIncomeDescription] = useState('');
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

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

  const handleAddExpense = () => {
    const expenseValue = parseFloat(expense);
    if (!isNaN(expenseValue)) {
      setCount(count + expenseValue);
      setFinalAmount(finalAmount - expenseValue);
      setExpenseHistory([...expenseHistory, { amount: expenseValue, description: expenseDescription }]);
      setExpense('');
      setExpenseDescription('');
    }
  };

  const handleAddIncome = () => {
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue)) {
      setFinalAmount(finalAmount + incomeValue);
      setIncomeHistory([...incomeHistory, { amount: incomeValue, description: incomeDescription }]);
      setIncome('');
      setIncomeDescription('');
    }
  };

  return (
    <>
      <div>
        <h2>Final Amount: {finalAmount}</h2>
      </div>

      {/* History section */}
      <h2>Expense History</h2>
      <ul>
        {expenseHistory.map((expense, index) => (
          <li key={index}>
            Amount: {expense.amount} - Description: {expense.description}
          </li>
        ))}
      </ul>
      <h2>Income History</h2>
      {/* for creating self history */}
      <ul>
        {incomeHistory.map((income, index) => (
          <li key={index}>
            Amount: {income.amount} - Description: {income.description}
          </li>
        ))}
      </ul>

      {/* expense part */}
      <input type="text" placeholder="Enter Amount" value={expense} onChange={handleExpenseChange} />
      <label>Expense</label>
      <input type="text" placeholder="Add Description" value={expenseDescription} onChange={handleExpenseDescriptionChange} />
      <button onClick={handleAddExpense}>Add</button>
      {/* income part */}
      <input type="text" placeholder="Enter Amount" value={income} onChange={handleIncomeChange} />
      <label>Income</label>
      <input type="text" placeholder="Add Description" value={incomeDescription} onChange={handleIncomeDescriptionChange} />
      <button onClick={handleAddIncome}>Add</button>
      <h1>Expense Tracker by Sourav Mohanta</h1>
    </>
  );
}

export default App;
