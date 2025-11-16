
import React from 'react';
import type { Income } from '../../types';

interface MoneyReceiptProps {
  incomes: Income[];
}

const toBengaliNumber = (n: number | string) => {
    const numStr = String(n);
    return numStr.replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
};

const MoneyReceipt: React.FC<MoneyReceiptProps> = ({ incomes }) => {

    const handlePrint = (income: Income) => {
        const printContent = `
        <style>
            body { font-family: 'Hind Siliguri', sans-serif; padding: 20px; line-height: 1.6; }
            .receipt { border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: auto; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .header h2 { margin: 0; color: #16a34a; font-size: 24px; }
            .header p { margin: 5px 0 0; font-size: 14px; }
            .details p { margin: 5px 0; }
            .details strong { min-width: 120px; display: inline-block; }
            .footer { margin-top: 30px; border-top: 1px dashed #999; padding-top: 10px; text-align: center; font-size: 13px; }
        </style>
        <div class="receipt">
            <div class="header">
                <h2>মানি রিসিট</h2>
                <p>জুই আইটি এন্ড স্টেশনারী সলিউশন</p>
            </div>
            <div class="details">
                <p><strong>রসিদ নং:</strong> ${toBengaliNumber(income.id.slice(-6))}</p>
                <p><strong>তারিখ:</strong> ${new Date(income.date).toLocaleDateString('bn-BD')}</p>
                <p><strong>কাস্টমারের নাম:</strong> ${income.customerName}</p>
                <p><strong>সার্ভিসসমূহ:</strong> ${income.services.join(', ')} ${income.otherService ? `, ${income.otherService}`: ''}</p>
                <p><strong>পরিমাণ:</strong> ${income.quantity}</p>
                <p><strong>বিবরণী:</strong> ${income.description || 'N/A'}</p>
                <hr style="margin: 15px 0; border-style: dashed;" />
                <p><strong>মোট টাকা:</strong> ${toBengaliNumber(income.amount)} টাকা</p>
            </div>
            <div class="footer">
                <p>ধন্যবাদ!</p>
            </div>
        </div>
        `;
        const printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write(`<html><head><title>মানি রিসিট</title><link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&display=swap" rel="stylesheet"></head><body>${printContent}</body></html>`);
            printWindow.document.close();
            printWindow.print();
        }
    };
    
    return (
        <div>
            <h3 className="mb-4 text-xl font-semibold">কাস্টমারের বিবরণী</h3>
            {incomes.length === 0 && <p className="mt-4 text-center text-gray-500">কোনো তথ্য পাওয়া যায় নি।</p>}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {incomes.map(income => (
                    <div key={income.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                        <div className="pb-2 mb-2 border-b">
                            <h4 className="font-semibold text-green-700">{income.customerName}</h4>
                            <p className="text-sm text-gray-500">তারিখ: {new Date(income.date).toLocaleDateString('bn-BD')}</p>
                        </div>
                        <div className="space-y-1 text-sm">
                            <p><strong className="font-medium">সার্ভিস:</strong> {income.services.join(', ')}</p>
                            <p><strong className="font-medium">টাকা:</strong> <span className="font-bold">{toBengaliNumber(income.amount)}</span></p>
                        </div>
                        <div className="mt-4 text-right">
                             <button onClick={() => handlePrint(income)} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                                প্রিন্ট রিসিট
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoneyReceipt;
