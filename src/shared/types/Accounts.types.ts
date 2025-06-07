export interface AccountBank {
  _id: string;
  title: string;
  accountType: string;
  backgroundColor: string;
  color: string;
  amount: number;
  sub: string;
}

export type GetAccountResponse = {
  data: {
    accounts: AccountBank[];
  }
}