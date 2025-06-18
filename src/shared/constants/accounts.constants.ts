import { AccountProvider, AccountProviderDisplay } from "../types/accounts.types";

export const TYPE_PROVIDER_DICT: Record<AccountProvider, AccountProviderDisplay> = {
  mastercard: 'Mastercard',
  visa: 'Visa',
  'american-express': 'American Express',
}

export const ACCOUNT_FETCH_TAG = 'accounts'