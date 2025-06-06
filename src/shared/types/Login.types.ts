import type { AxiosError, AxiosResponse } from "axios";

export interface LoginError extends Omit<AxiosError, 'response'> {
  response: AxiosResponse<{
    error: {
      error: string
    }
  }>;
}