export interface ZodError {
  validation: string;
  code: string;
  message: string;
  path: string[];
}

export interface FormError {
  message: string;
  path: string[];
  code: string;
}

// Routes
export const DASHBOARD_ROUTE = '/dashboard';