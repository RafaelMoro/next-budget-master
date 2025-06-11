import { FetchAccountsResponse, GetAccountsResponse } from "../types/accounts.types";
import { ErrorCatched } from "../types/global.types";

export const fetchAccounts = async ({ accessToken }: { accessToken: string }): Promise<GetAccountsResponse> => {
  try {
    if (!accessToken) {
      return {
        message: 'No access token provided',
        accounts: []
      }
    }
    const res = await fetch('http://localhost:6006/account-actions', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data: FetchAccountsResponse = await res.json()
    const { data: { accounts } } = data;
    return {
      message: 'Accounts fetched successfully',
      accounts
    }
  } catch (error: unknown) {
    console.error('Error fetching accounts:', error);
    return {
      message: (error as ErrorCatched)?.message,
      accounts: []
    }
  }
}