export type AccountBank = {
  _id: string;
  title: string;
  accountType: string;
  backgroundColor: string;
  color: string;
  amount: number;
  sub: string;
}

export type AccountsDisplay = {
  accountId: string;
  name: string;
  amount: string;
  type: string;
}

// Response from backend
export type FetchAccountsResponse = {
  data: {
    accounts: AccountBank[];
  }
}

// Response from the function getAccounts
export type GetAccountsResponse = {
  message: string;
  accounts: AccountBank[];
}