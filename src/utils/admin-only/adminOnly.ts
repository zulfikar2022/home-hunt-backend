import { NextFunction, Request, Response } from "express";
import { tokenDecoder } from "../token-decoder";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const decodedToken = tokenDecoder(token!, res);
  if (decodedToken?.role !== "admin") {
    res
      .status(403)
      .json(
        createFailureResponse(
          "Your are not authorized to access this route",
          403
        )
      );
  }
  next();
};
