import axios from "axios";

import { getAccountProvider, getTerminationFormatted } from "../lib/accounts.lib"
import { AccountBank, AccountTypes, GetAccountsResponse } from "../types/accounts.types"
import { formatNumberToCurrency } from "./formatNumberCurrency.utils"
import { ErrorCatched } from "../types/global.types";

export const transformAccountsDisplay = ({ accounts }: { accounts: AccountBank[] }) => {
  return accounts.map((account) => ({
    accountId: account._id,
    name: account.title,
    amount: formatNumberToCurrency(account.amount),
    // We're sure the account type is not other string than type AccountTypes
    type: (account.accountType as AccountTypes),
    alias: account.alias,
    terminationFourDigits: account.terminationFourDigits,
    terminationFourDigitsTransformed: getTerminationFormatted(account.terminationFourDigits),
    accountProvider: getAccountProvider(account.accountProvider) // Default to mastercard if not provided
  }))
}

export const getAccountsCb = async (accessToken: string): Promise<GetAccountsResponse> => {
  try {
    const uri = process.env.NEXT_PUBLIC_BACKEND_URI
    if (!uri) {
      return {
        detailedError: {
         message: 'Uri missing'
        },
        accounts: []
      }
    }
    if (!accessToken) {
      return {
        detailedError: {
         message: 'No access token provided'
        },
        accounts: []
      }
    }
    const res = await axios.get(`${uri}/account-actions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res?.data
  } catch (error) {
    console.error('Error fetching accounts:', error);
    if ((error as ErrorCatched)?.cause?.code) {
      return {
        detailedError: {
          message: (error as ErrorCatched)?.message,
          cause: (error as ErrorCatched)?.cause?.code
        },
        accounts: []
      }
    }

    return {
      detailedError: {
        message: (error as ErrorCatched)?.message
      },
      accounts: []
    }
  }
}