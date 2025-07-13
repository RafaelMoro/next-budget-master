import { AccountTypes } from "./accounts.types";
import { BankMovement } from "./records.types";

export interface YupError {
  message: string;
}

export type BudgetMasterLocalStorage = {
  'selected-account': SelectedAccountLS
  'edit-record': {
    record: BankMovement
  }
}

export type SelectedAccountLS = {
  accountId: string;
  accountType: AccountTypes;
}

export type GeneralError = {
  response: {
    data: {
      error: {
        message: string;
      }
    }
  }
}

export type ErrorCatched = {
  message: string;
  cause?: {
    code: string
  }
}

export type DetailedError = {
  message: string;
  cause?: string;
}

export const ABBREVIATED_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
export type AbbreviatedMonthsType = typeof ABBREVIATED_MONTHS[number];

export const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const;
export type CompleteMonthsType = typeof MONTHS[number];