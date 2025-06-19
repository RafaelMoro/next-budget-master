import { AxiosResponse } from "axios";
import { Budget } from "./budgets.types";
import { Category } from "./categories.types";

export type TypeOfRecord = 'expense' | 'income' | 'transfer';

export type TransferRecord = {
  transferId: string;
  account: string;
}

export type IndebtedPeople = {
  _id?: string;
  name: string;
  amount: string;
  amountPaid: string;
  isPaid: boolean;
}

export type AccountRecord = {
  _id: string;
  transferRecord?: TransferRecord;
  userId: string;
  shortName: string;
  typeOfRecord: TypeOfRecord;
  description: string;
  amount: number;
  amountFormatted: string;
  date: Date;
  fullDate: string;
  formattedTime: string;
  category: Category | null;
  subCategory: string;
  tag: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  budgets: string[];
}

export type ExpensePaid = {
  _id: string;
  shortName: string;
  amount: number;
  amountFormatted: string;
  formattedTime: string;
  fullDate: string;
  isPaid: boolean;
  date: Date;
}

/**
 * Represents a record of an account transaction, which can be an expense, income, or transfer.
 */
export type BankMovement = AccountRecord & {
  isPaid?: boolean;
  linkedBudgets?: Budget[];
  expensesPaid?: ExpensePaid[];
}

export type GetAccountPayload = {
  accountId: string;
  month: string;
  year: string;
}

export type GetRecordsResponse = Omit<AxiosResponse, 'data'> & {
  data: AxiosResponse<{
    records: BankMovement[];
  }>;
}