import axios from "axios";
import { BankMovement, ExpenseDataResponse, CreateExpensePayload, IncomeDataResponse as IncomeDataResponse, CreateIncomePayload, EditExpensePayload, EditIncomePayload, FetchExpensesDatePayload, FetchExpensesDateResponse, CreateTransferValues, ExpensePaid, TransferIncome, TransferExpense, CreateTransferPayload, TransferDataResponse } from "../types/records.types";
import { addToLocalStorage, removeFromLocalStorage } from "../lib/local-storage.lib";
import { EDIT_RECORD_KEY } from "../constants/local-storage.constants";
import { defaultResFetchExpenses } from "../constants/records.constants";

//#region API Calls
export const createExpenseCb = (data: CreateExpensePayload, accessToken: string): Promise<ExpenseDataResponse> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.post(`${uri}/expenses-actions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editExpenseCb = (data: EditExpensePayload, accessToken: string): Promise<ExpenseDataResponse> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.put(`${uri}/expenses-actions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const createIncomeCb = (data: CreateIncomePayload, accessToken: string): Promise<IncomeDataResponse> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.post(`${uri}/incomes-actions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editIncomeCb = (data: EditIncomePayload, accessToken: string): Promise<IncomeDataResponse> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.put(`${uri}/incomes-actions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const createTransferCb = (data: CreateTransferPayload, accessToken: string): Promise<TransferDataResponse> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.post(`${uri}/records/transfer`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getExpensesByDateCb = async (payload: FetchExpensesDatePayload, accessToken: string): Promise<FetchExpensesDateResponse> => {
  try {
    const { month, year, accountId } = payload;
    const uri = process.env.NEXT_PUBLIC_BACKEND_URI
    if (!uri) {
      return {
        ...defaultResFetchExpenses,
        error: 'Backend URI is not defined"',
      }
    }
    if (!accessToken) {
      return {
        ...defaultResFetchExpenses,
        error: 'Access token is not defined"',
      }
    }
    const res = await axios.get(`${uri}/expenses-actions/${accountId}/${month}/${year}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (error) {
    console.error('Error fetching expenses by date:', error);
    return {
      ...defaultResFetchExpenses,
      error: (error as Error).message
    }
  }
}

//#region Local Storage
export const saveEditRecordLS = (recordToBeEdited: BankMovement) => {
  try {
    addToLocalStorage({ prop: EDIT_RECORD_KEY, newInfo: { record: recordToBeEdited } })
  } catch (error) {
    console.log('error while saving record to be edited in local storage', error)
  }
}

export const resetEditRecordLS = () => {
  try {
    removeFromLocalStorage({ prop: "edit-record" })
  } catch (error) {
    console.log('error while removing record to be edited in local storage', error)
  }
}

//#region Utility

export const getValuesIncomeAndExpense = ({ values, expensesSelected }: { values: CreateTransferValues, expensesSelected: ExpensePaid[] }) => {
  const typeOfRecordValue = 'transfer';
  const {
    origin, destination, ...restValues
  } = values;
  const newValuesExpense: TransferExpense = {
    ...restValues,
    indebtedPeople: [],
    account: origin,
    typeOfRecord: typeOfRecordValue,
    isPaid: true,
    linkedBudgets: [],
  };
  const newValuesIncome: TransferIncome = {
    ...restValues,
    indebtedPeople: [],
    expensesPaid: expensesSelected,
    account: destination,
    typeOfRecord: typeOfRecordValue,
  };
  return { newValuesIncome, newValuesExpense };
};

interface GetOriginAccountProps {
  isIncome: boolean;
  recordToBeEdited?: BankMovement | null;
}

export const getOriginAccountForEdit = ({
  isIncome, recordToBeEdited,
}: GetOriginAccountProps) => {
  if (recordToBeEdited) {
    return !isIncome ? recordToBeEdited.account : recordToBeEdited.transferRecord?.account ?? '';
  }
  return '';
};

export const symmetricDifferenceExpensesRelated = (oldArray: ExpensePaid[], newArray: ExpensePaid[]) => {
  const getId = (expense: ExpensePaid) => expense._id;
  const firstDifference = oldArray.filter((oldExpense) => !newArray.some((newExpense) => getId(oldExpense) === getId(newExpense)));
  const secondDifference = newArray.filter((newExpense) => !oldArray.some((oldExpense) => getId(newExpense) === getId(oldExpense)));

  return {
    oldRecords: firstDifference,
    newRecords: secondDifference,
  };
}