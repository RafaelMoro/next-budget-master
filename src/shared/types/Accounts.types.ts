export type AccountBank<TType, TAmount = number> = {
  _id: string;
  title: TType;
  accountType: string;
  backgroundColor: string;
  color: string;
  amount: TAmount;
  sub: string;
}

export type GetAccountResponse = {
  data: {
    accounts: AccountBank<string, number>[];
  }
}