
import React, { useState } from 'react';
import type { Income, Expense } from '../types';
import TodayIncome from './tabs/TodayIncome';
import TodayExpense from './tabs/TodayExpense';
import ManageIncome from './tabs/ManageIncome';
import ManageExpense from './tabs/ManageExpense';
import MoneyReceipt from './tabs/MoneyReceipt';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('todayIncome');
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addIncome = (income: Income) => {
    setIncomes(prev => [...prev, income]);
    setActiveTab('manageIncome');
  };

  const deleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };
  
  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
    setActiveTab('manageExpense');
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const tabs = [
    { id: 'todayIncome', label: 'আজকের আয়' },
    { id: 'todayExpense', label: 'আজকের ব্যায়' },
    { id: 'manageIncome', label: 'ম্যানেজ আয়' },
    { id: 'manageExpense', label: 'ম্যানেজ ব্যায়' },
    { id: 'moneyReceipt', label: 'মানি রিসিট' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'todayIncome':
        return <TodayIncome onSave={addIncome} />;
      case 'todayExpense':
        return <TodayExpense onSave={addExpense} />;
      case 'manageIncome':
        return <ManageIncome incomes={incomes} onDelete={deleteIncome} />;
      case 'manageExpense':
        return <ManageExpense expenses={expenses} onDelete={deleteExpense}/>;
      case 'moneyReceipt':
        return <MoneyReceipt incomes={incomes} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-4 bg-white shadow-md">
        <h1 className="text-4xl font-bold text-center text-green-600">
          জুই আইটি এন্ড স্টেশনারী সলিউশন
        </h1>
      </header>
      <main className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base sm:px-4 flex-grow sm:flex-grow-0 text-center
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm sm:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
