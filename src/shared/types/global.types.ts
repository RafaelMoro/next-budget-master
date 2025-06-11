export interface YupError {
  message: string;
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