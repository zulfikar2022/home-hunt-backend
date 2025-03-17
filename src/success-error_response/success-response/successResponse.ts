interface SuccessResponse {
  message: string;
  statusCode: number;
  data: any;
  success: true;
}

export function createSuccessResponse(
  message: string = "Request successful",
  statusCode: number = 200,
  data: any
): SuccessResponse {
  return {
    message,
    statusCode,
    data,
    success: true,
  };
}
