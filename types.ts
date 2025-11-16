
export interface Income {
  id: string;
  customerName: string;
  services: string[];
  otherService?: string;
  quantity: string;
  date: string;
  amount: number;
  description: string;
}

export interface Expense {
  id: string;
  reason: string;
  date: string;
  amount: number;
  description: string;
}
