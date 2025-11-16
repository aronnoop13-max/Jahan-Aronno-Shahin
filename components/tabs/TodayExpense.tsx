
import React, { useState, useRef } from 'react';
import type { Expense } from '../../types';

interface TodayExpenseProps {
  onSave: (expense: Expense) => void;
}

const TodayExpense: React.FC<TodayExpenseProps> = ({ onSave }) => {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (!reason || !amount || !date) {
      alert('অনুগ্রহ করে কারণ, টাকার পরিমাণ এবং তারিখ পূরণ করুন।');
      return;
    }
    const newExpense: Expense = {
      id: Date.now().toString(),
      reason,
      amount: parseFloat(amount) || 0,
      date,
      description,
    };
    onSave(newExpense);
    // Reset form
    setReason('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  };

  const handlePrint = () => {
    if (!reason || !amount || !date) {
      alert('প্রিন্ট করার জন্য অনুগ্রহ করে তথ্য পূরণ করুন।');
      return;
    }
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>ব্যায় বিবরণী</title>');
      printWindow.document.write('<style>body { font-family: "Hind Siliguri", sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(printRef.current?.innerHTML ?? '');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">ব্যায়ের কারণ</label>
          <input type="text" value={reason} onChange={e => setReason(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">তারিখ</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">টাকার পরিমাণ</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">বিবরণী</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        <button onClick={handlePrint} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          প্রিন্ট
        </button>
        <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          সংরক্ষণ
        </button>
      </div>

       {/* Hidden div for printing */}
       <div className="hidden">
            <div ref={printRef}>
                <h2>ব্যায় বিবরণী</h2>
                <table >
                    <tbody>
                        <tr><th>ব্যায়ের কারণ</th><td>{reason}</td></tr>
                        <tr><th>টাকার পরিমাণ</th><td>{amount}</td></tr>
                        <tr><th>তারিখ</th><td>{new Date(date).toLocaleDateString('bn-BD')}</td></tr>
                        <tr><th>বিবরণী</th><td>{description}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default TodayExpense;
