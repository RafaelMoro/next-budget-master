import { AxiosResponse } from "axios";
import { Budget } from "./budgets.types";
import { Category } from "./categories.types";
import { DetailedError } from "./global.types";
import { object, string } from "yup";

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
  data: {
    data: {
      records: BankMovement[];
    }
    message?: string | null;
  };
}

export type GetCurrentMonthRecordsResponse = {
  detailedError: DetailedError | null;
  message: string | null;
  records: BankMovement[];
}

export type CreateExpenseData = {
  shortDescription: string
  description: string
}

const shortNameValidation = string()
  .required('Por favor, ingrese una pequeña descripción')
  .min(3, 'La pequeña descripción debe contener más de 3 caracteres')
  .max(50, 'La pequeña descripción debe contener menos de 50 caracteres.');
const descriptionValidation = string()
// TODO: Remove required
  .required()
    .min(3, 'Por favor, ingrese una descripción de más de 3 caracteres')
    .max(300, 'Por favor, ingrese una descripción con menos de 300 caracteres.')

export const CreateExpenseSchema = object({
  shortDescription: shortNameValidation,
  description: descriptionValidation
})