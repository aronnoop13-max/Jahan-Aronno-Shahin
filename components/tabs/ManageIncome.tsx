import React from 'react';
import type { Income } from '../../types';

interface ManageIncomeProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

const toBengaliNumber = (n: number | string) => {
    const numStr = String(n);
    return numStr.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
};


const ManageIncome: React.FC<ManageIncomeProps> = ({ incomes, onDelete }) => {

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  // Fix: Correctly type the `serviceCounts` object by providing a generic to the `reduce` method.
  // This resolves an issue where `count` was inferred as `unknown` in the `map` function below,
  // causing a type error.
  const serviceCounts = incomes.flatMap(i => i.services).reduce<Record<string, number>>((acc, service) => {
      acc[service] = (acc[service] || 0) + 1;
      return acc;
  }, {});

  const handlePrint = (income: Income) => {
    const printContent = `
        <style>
            body { font-family: 'Hind Siliguri', sans-serif; padding: 20px; }
            h2 { color: #16a34a; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #777; }
        </style>
        <h2>আয়ের রসিদ</h2>
        <table>
            <tr><th>কাস্টমারের নাম</th><td>${income.customerName}</td></tr>
            <tr><th>সার্ভিসসমূহ</th><td>${income.services.join(', ')} ${income.otherService ? `, ${income.otherService}`: ''}</td></tr>
            <tr><th>পরিমাণ</th><td>${income.quantity}</td></tr>
            <tr><th>তারিখ</th><td>${new Date(income.date).toLocaleDateString('bn-BD')}</td></tr>
            <tr><th>টাকার পরিমাণ</th><td>${toBengaliNumber(income.amount)} টাকা</td></tr>
            <tr><th>বিবরণী</th><td>${income.description || 'N/A'}</td></tr>
        </table>
        <div class="footer">
            <p>জুই আইটি এন্ড স্টেশনারী সলিউশন</p>
        </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>আয়ের রসিদ</title><link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap" rel="stylesheet"></head><body>${printContent}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };
  
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">সকল আয়</h3>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">কাস্টমারের নাম</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">সার্ভিস</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">তারিখ</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">টাকা</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">একশন</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomes.map(income => (
              <tr key={income.id}>
                <td className="px-6 py-4 whitespace-nowrap">{income.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{income.services.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(income.date).toLocaleDateString('bn-BD')}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">{toBengaliNumber(income.amount)}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <button onClick={() => handlePrint(income)} className="px-3 py-1 mr-2 text-sm text-white bg-green-500 rounded hover:bg-green-600">প্রিন্ট</button>
                  <button onClick={() => onDelete(income.id)} className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">ডিলেট</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {incomes.length === 0 && <p className="mt-4 text-center text-gray-500">কোনো আয়ের তথ্য পাওয়া যায় নি।</p>}

      <div className="p-4 mt-6 bg-gray-100 rounded-lg">
        <h4 className="mb-2 text-lg font-semibold">সারসংক্ষেপ</h4>
        <p className="font-bold">মোট আয়: <span className="text-green-600">{toBengaliNumber(totalIncome)} টাকা</span></p>
        <div className="mt-2">
            <h5 className="font-semibold">সার্ভিসের বিবরণী:</h5>
            <ul className="pl-5 list-disc">
                {Object.entries(serviceCounts).map(([service, count]) => (
                    <li key={service}>{service}: {toBengaliNumber(count)} বার</li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageIncome;