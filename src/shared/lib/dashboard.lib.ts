import { ACCOUNT_FETCH_TAG } from "../constants/accounts.constants";
import { FetchAccountsResponse, GetAccountsResponse } from "../types/accounts.types";
import { ErrorCatched } from "../types/global.types";

export const fetchAccounts = async ({ accessToken }: { accessToken: string }): Promise<GetAccountsResponse> => {
  try {
    if (!accessToken) {
      return {
        detailedError: {
         message: 'No access token provided'
        },
        accounts: []
      }
    }
    const uri = process.env.NEXT_PUBLIC_BACKEND_URI
    if (!uri) {
      throw new Error("Backend URI is not defined");
    }
    const res = await fetch(`${uri}/account-actions`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      next: {
        tags: [ACCOUNT_FETCH_TAG]
      },
    })
    const data: FetchAccountsResponse = await res.json()
    const { data: { accounts } } = data;
    return {
      detailedError: null,
      accounts
    }
  } catch (error: unknown) {
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