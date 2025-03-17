interface FailureResponse {
  message: string;
  statusCode: number;
  error: Error;
  success: false;
}

export function createFailureResponse(
  message: string = "An error occurred",
  statusCode: number = 500,
  error: Error = new Error(
    "An error occurred. Please try again or contact support."
  )
): FailureResponse {
  return {
    message,
    statusCode,
    error,
    success: false,
  };
}
