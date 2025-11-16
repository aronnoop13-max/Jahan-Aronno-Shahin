
import React, { useState } from 'react';
import type { Income } from '../../types';
import { SERVICES } from '../../constants';

interface TodayIncomeProps {
  onSave: (income: Income) => void;
}

const toBengaliNumber = (n: number | string) => {
    const numStr = String(n);
    return numStr.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
};


const TodayIncome: React.FC<TodayIncomeProps> = ({ onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleServiceChange = (service: string) => {
    const isSelected = selectedServices.includes(service);
    if (service === 'Others') {
        setShowOtherInput(!showOtherInput);
    }
    
    if (isSelected) {
      setSelectedServices(prev => prev.filter(s => s !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const isFormValid = () => {
    return customerName && selectedServices.length > 0 && quantity && date && amount;
  };

  const getFormData = (): Income | null => {
      if(!isFormValid()) return null;
       return {
            id: Date.now().toString(),
            customerName,
            services: selectedServices,
            otherService: showOtherInput ? otherService : undefined,
            quantity,
            date,
            amount: parseFloat(amount) || 0,
            description,
        };
  };

  const handleSave = () => {
    if (!isFormValid()) {
      alert('অনুগ্রহ করে প্রয়োজনীয় সকল তথ্য পূরণ করুন।');
      return;
    }
    const newIncome = getFormData();
    if(newIncome) {
        onSave(newIncome);
        // Reset form
        setCustomerName('');
        setSelectedServices([]);
        setOtherService('');
        setQuantity('');
        setDate(new Date().toISOString().split('T')[0]);
        setAmount('');
        setDescription('');
        setShowOtherInput(false);
    }
  };
  
  const handleDownload = () => {
      const incomeData = getFormData();
      if (!incomeData) {
          alert('প্রথমে তথ্য পূরণ করে সংরক্ষণ করুন।');
          return;
      }

      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF();

      doc.addFont('/path-to-font/HindSiliguri-Regular.ttf', 'HindSiliguri', 'normal');
      doc.setFont('HindSiliguri');

      doc.text("আয়ের বিবরণী", 14, 16);
      (doc as any).autoTable({
          startY: 20,
          head: [['বিবরণ', 'তথ্য']],
          body: [
              ['কাস্টমারের নাম', incomeData.customerName],
              ['সার্ভিস', incomeData.services.join(', ') + (incomeData.otherService ? `, ${incomeData.otherService}` : '')],
              ['কাজের পরিমাণ', incomeData.quantity],
              ['তারিখ', new Date(incomeData.date).toLocaleDateString('bn-BD')],
              ['টাকার পরিমাণ', `${toBengaliNumber(incomeData.amount)} টাকা`],
              ['বিবরণী', incomeData.description || 'N/A'],
          ],
          styles: { font: 'HindSiliguri' },
          headStyles: { fillColor: [41, 128, 185] },
      });
      doc.save(`income-${incomeData.customerName}-${incomeData.date}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">কাস্টমারের নাম</label>
          <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">তারিখ</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">সার্ভিসের ধরণ</label>
        <div className="grid grid-cols-2 mt-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map(service => (
            <div key={service} className="flex items-center">
              <input id={service} type="checkbox" checked={selectedServices.includes(service)} onChange={() => handleServiceChange(service)} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
              <label htmlFor={service} className="ml-2 text-sm text-gray-700">{service}</label>
            </div>
          ))}
        </div>
        {showOtherInput && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">অন্যান্য সার্ভিস লিখুন</label>
            <input type="text" value={otherService} onChange={e => setOtherService(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">কাজের পরিমাণ</label>
          <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">টাকার পরিমাণ (বাংলায়)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={amount ? toBengaliNumber(amount) : '০'} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">বিবরণী</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        <button onClick={handleDownload} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          ডাউনলোড
        </button>
        <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          সংরক্ষণ
        </button>
      </div>
    </div>
  );
};

export default TodayIncome;
