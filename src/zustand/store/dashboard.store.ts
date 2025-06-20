import { createContext } from 'react';
import { createStore } from 'zustand/vanilla'
import { AccountBank, AccountsDisplay } from '../../shared/types/accounts.types';
import { BankMovement } from '../../shared/types/records.types';
import { transformAccountsDisplay as transformAccountsDisplayUtil } from '../../shared/utils/accounts.utils';

export type DashboardState = {
  accounts: AccountBank[];
  accountsDisplay: AccountsDisplay[];
  selectedAccount: AccountBank | null;
  records: BankMovement[]
}

export type DashboardActions = {
  transformAccountsDisplay: (accounts: AccountBank[]) => void
}

export type DashboardStore = DashboardState & DashboardActions

export const defaultInitState: DashboardState = {
  accounts: [],
  accountsDisplay: [],
  selectedAccount: null,
  records: []
}

export const createDashboardStore = (
  initState: DashboardState = defaultInitState,
) => {
  return createStore<DashboardStore>()((set) => ({
    ...initState,
    transformAccountsDisplay: () => set((state) => {
      const accountsTransformed = transformAccountsDisplayUtil({  accounts: state.accounts });
      return {
        ...state,
        accountsDisplay: accountsTransformed,
      }
    }),
  }))
}

export type DashboardStoreApi = ReturnType<typeof createDashboardStore>
export const DashboardStoreContext = createContext<DashboardStoreApi | undefined>(
  undefined,
)