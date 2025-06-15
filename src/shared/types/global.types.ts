export interface YupError {
  message: string;
}

export interface BudgetMasterLocalStorage {
  preferences: {
    themeMode: 'dark' | 'light'
  }
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
}