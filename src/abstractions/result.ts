export class Error {
  constructor(
    codeDescription: string,
    statusCode: number,
    errorDescription: string | null = null,
  ) {
    this.codeDescription = codeDescription;
    this.statusCode = statusCode;
    this.errorDescription = errorDescription;
  }

  public codeDescription: string;
  public statusCode: number;
  public errorDescription: string | null = null;
}

export class Result<T> {
  public isSuccessful: boolean;
  public error: Error | null;
  public data: T | null;

  protected constructor(
    isSuccess: boolean,
    data: T | null = null,
    error: Error | null = null,
  ) {
    this.isSuccessful = isSuccess;
    this.error = error;
    this.data = data;
  }

  public static success<U>(data: U): Result<U> {
    return new Result<U>(true, data);
  }

  public static failure<U>(error: Error): Result<U> {
    return new Result<U>(false, null, error);
  }
}
