import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../users/landlord/landlords.controllers";
import { Response } from "express";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";

export const tokenDecoder = (token: string, res: Response) => {
  const decodeToken = jwtDecode<CustomJwtPayload>(token);
  if (!decodeToken) {
    res.status(401).json(createFailureResponse("Invalid token", 401));
  }
  return decodeToken;
};
