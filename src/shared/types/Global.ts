export interface ZodError {
  validation: string;
  code: string;
  message: string;
  path: string[];
}