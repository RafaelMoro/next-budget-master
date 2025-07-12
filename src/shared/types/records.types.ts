import { AxiosError, AxiosResponse } from "axios";
import { Budget } from "./budgets.types";
import { Category } from "./categories.types";
import { DetailedError } from "./global.types";
import { object, string } from "yup";

//#region General interfaces
export type TypeOfRecord = 'expense' | 'income' | 'transfer';

export type TransferRecord = {
  transferId: string;
  account: string;
}

export type IndebtedPeople = {
  _id?: string;
  name: string;
  amount: number;
  amountPaid: number;
  isPaid: boolean;
}

export type IndebtedPeopleUI = IndebtedPeople & {
  amountFormatted: string
  amountPaidFormatted: string;
  remainingAmountFormatted: string;
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

export type ExpenseRecord = AccountRecord & {
  isPaid: boolean;
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

//#region Paylaod and responses interfaces

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

export type CreateExpensePayload = {
  account: string;
  amount: number;
  budgets: string[];
  category: string;
  date: Date;
  description: string;
  indebtedPeople: IndebtedPeople[];
  isPaid: boolean;
  linkedBudgets: string[];
  shortName: string;
  subCategory: string;
  tag: string[];
  typeOfRecord: 'expense'
}

export type CreateIncomePayload = {
  account: string;
  amount: number;
  budgets: string[];
  category: string;
  date: Date;
  description: string;
  expensesPaid: ExpensePaid[]
  indebtedPeople: IndebtedPeople[];
  shortName: string;
  subCategory: string;
  tag: string[];
  typeOfRecord: 'income'
}

export interface CreateExpenseData {
  data: {
    expense: ExpenseRecord
  }
  error: null;
  message: string[];
  success: boolean;
  version: string;
}

export interface CreateExpenseError extends Omit<AxiosError, 'response'> {
  response: AxiosResponse<{
    error: {
      message: string;
    }
  }>;
}

export type GetCurrentMonthRecordsResponse = {
  detailedError: DetailedError | null;
  message: string | null;
  records: BankMovement[];
}

//#region Data form - schemas

export type CreateExpenseDataForm = {
  shortDescription: string
  description?: string | null | undefined
}

export type CreateIncomeDataForm = {
  shortDescription: string
  description?: string | null | undefined
}

export type AddIndebtedPeopleDataForm = {
  name: string
}

const shortNameValidation = string()
  .required('Por favor, ingrese una pequeña descripción')
  .min(3, 'La pequeña descripción debe contener más de 3 caracteres')
  .max(50, 'La pequeña descripción debe contener menos de 50 caracteres.');
const descriptionValidation = string()
  .nullable()
  .notRequired()
  .when('description', {
    is: (value: string) => value?.length,
    then: (rule) => rule.min(3, 'Por favor, ingrese una descripción de más de 3 caracteres').max(300, 'Por favor, ingrese una descripción con menos de 300 caracteres.'),
  })

export const IncomeExpenseSchema = object().shape({
  shortDescription: shortNameValidation,
  description: descriptionValidation
}, [
  ["description", "description"]
])

export const AddIndebtedPeopleSchema = object().shape({
  name: string()
    .required('Por favor, ingrese el nombre de la persona')
    .min(3, 'El nombre debe contener más de 3 caracteres')
    .max(100, 'El nombre debe contener menos de 100 caracteres.'),
})