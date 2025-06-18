import { number, object, string } from "yup";
import { DetailedError } from "./global.types";
import { AxiosError, AxiosResponse } from "axios";

export type AccountBank = {
  _id: string;
  title: string;
  accountType: string;
  backgroundColor: string;
  color: string;
  amount: number;
  sub: string;
  accountProvider?: string;
  terminationFourDigits?: number;
  alias?: string;
}

export type AccountProvider = "mastercard" | "visa" | "american-express"
export type AccountProviderDisplay = 'Mastercard' | 'Visa' | 'American Express'
export type AccountTypes = 'Crédito' | 'Débito' | 'Vales de comida' | 'Vales de restaurante' | 'Cuenta de ahorro'
export type AccountModalAction = 'edit' | 'view' | 'delete'

export const TYPE_OF_ACCOUNTS: readonly AccountTypes[] = ['Crédito', 'Débito', 'Vales de comida', 'Vales de restaurante', 'Cuenta de ahorro'] as const;
export const ACCOUNT_PROVIDERS: readonly AccountProvider[] = ['mastercard', 'visa', 'american-express'] as const;

export type AccountsDisplay = {
  accountId: string;
  name: string;
  amount: string;
  type: AccountTypes;
  accountProvider?: AccountProvider;
  terminationFourDigits?: number;
  terminationFourDigitsTransformed?: string;
  alias?: string;
}

//#region Data interfaces

export type EditAccountPayload = {
  accountId: string
  title: string;
  alias: string;
  accountType: string;
  accountProvider: AccountProvider;
  amount: number;
  terminationFourDigits: number;
  backgroundColor: string;
  color: string;
}

export interface EditAccountData {
  data: {
    account: AccountBank;
  }
  error: null;
  message: null;
  success: boolean;
  version: string;
}

export interface EditAccountError extends Omit<AxiosError, 'response'> {
  response: AxiosResponse<{
    error: {
      message: string | string[];
      statusCode: number
    }
  }>;
}

// Response from backend
export type FetchAccountsResponse = {
  data: {
    accounts: AccountBank[];
  }
}

// Response from the function getAccounts
export type GetAccountsResponse = {
  detailedError: DetailedError | null;
  accounts: AccountBank[];
}

//#region Validations

export type EditAccountFormData = {
  title: string;
  terminationFourDigits: number;
  alias: string
}

// Excluding amount as it can't be empty
export const EditAccountSchema = object({
  title: string()
    .required("Por favor, ingrese el título de la cuenta")
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(50, "El título no puede exceder los 50 caracteres"),
  alias: string()
    .required("Por favor, ingrese el título de la cuenta")
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(30, "El título no puede exceder los 30 caracteres"),
  terminationFourDigits: number()
    .typeError("Debe ingresar los 4 dígitos finales")
    .required("Debe ingresar los 4 dígitos finales")
    .min(1000, "Debe ser un número de 4 dígitos")
    .max(9999, "Debe ser un número de 4 dígitos"),
})