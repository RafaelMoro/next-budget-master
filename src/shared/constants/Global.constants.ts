export type ThemeMode = 'light' | 'dark';

// Cookie keys
export const COOKIE_SESSION_KEY = 'session'
export const THEME_COOKIE_KEY = 'theme'
// Stands for fintrack selected bank account
export const ACCOUNT_COOKIE_KEY = 'ftk_sba'
export const OVERVIEW_SUBSCREEN_KEY = 'overview_subscreen'
export const DASHBOARD_SCREEN_KEY = 'dashboard_screen'

export const CURRENT_MONTH_RECORDS_TAG = 'current-month-records'

export const ERROR_CONNECTION = 'ECONNREFUSED'

export const ERROR_CONNECTION_MESSAGE = 'Hubo un error con tu red. Revisa tu conexión a internet e intenta nuevamente.'
export const GENERAL_ERROR_TITLE = 'Oops! Algo no salió como esperabamos.'

// Routes
export const DASHBOARD_ROUTE = '/dashboard';
export const REGISTER_ROUTE = '/register';
export const FORGOT_PASSWORD_ROUTE = '/forgot-password';
export const LOGIN_ROUTE = '/';
export const CREATE_RECORD_ROUTE = '/create-record';
export const EDIT_EXPENSE_ROUTE = '/edit-record/edit-expense'
export const EDIT_INCOME_ROUTE = '/edit-record/edit-income'
