
import React from 'react';
import type { Expense } from '../../types';

interface ManageExpenseProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const toBengaliNumber = (n: number | string) => {
    const numStr = String(n);
    return numStr.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
};

const ManageExpense: React.FC<ManageExpenseProps> = ({ expenses, onDelete }) => {
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handlePrint = (expense: Expense) => {
    const printContent = `
        <style>
            body { font-family: 'Hind Siliguri', sans-serif; padding: 20px; }
            h2 { color: #dc2626; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #777; }
        </style>
        <h2>ব্যায় রসিদ</h2>
        <table>
            <tr><th>ব্যায়ের কারণ</th><td>${expense.reason}</td></tr>
            <tr><th>তারিখ</th><td>${new Date(expense.date).toLocaleDateString('bn-BD')}</td></tr>
            <tr><th>টাকার পরিমাণ</th><td>${toBengaliNumber(expense.amount)} টাকা</td></tr>
            <tr><th>বিবরণী</th><td>${expense.description || 'N/A'}</td></tr>
        </table>
        <div class="footer">
            <p>জুই আইটি এন্ড স্টেশনারী সলিউশন</p>
        </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>ব্যায় রসিদ</title><link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap" rel="stylesheet"></head><body>${printContent}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">সকল ব্যায়</h3>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ব্যায়ের কারণ</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">তারিখ</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">টাকা</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">একশন</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap">{expense.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.date).toLocaleDateString('bn-BD')}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">{toBengaliNumber(expense.amount)}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button onClick={() => handlePrint(expense)} className="px-3 py-1 mr-2 text-sm text-white bg-green-500 rounded hover:bg-green-600">প্রিন্ট</button>
                  <button onClick={() => onDelete(expense.id)} className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">ডিলেট</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {expenses.length === 0 && <p className="mt-4 text-center text-gray-500">কোনো ব্যায়ের তথ্য পাওয়া যায় নি।</p>}

      <div className="p-4 mt-6 bg-gray-100 rounded-lg">
        <h4 className="mb-2 text-lg font-semibold">সারসংক্ষেপ</h4>
        <p className="font-bold">মোট ব্যায়: <span className="text-red-600">{toBengaliNumber(totalExpense)} টাকা</span></p>
      </div>
    </div>
  );
};

export default ManageExpense;
