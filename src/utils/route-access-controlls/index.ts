import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";
import { envVars } from "../../configuration/env.config";
import { ITokenPayload } from "../../users/users.controllers";

export enum UserRole {
  Admin = "admin",
  Landlord = "landlord",
  Tenant = "tenant",
}

const auth = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json(createFailureResponse("Unauthorized: No token provided", 401));
    }

    try {
      const secretKey = envVars.JWT_PRIVATE_KEY!;
      const decoded = jwt.verify(token, secretKey) as ITokenPayload;

      if (!allowedRoles.includes(decoded.role as UserRole)) {
        return res
          .status(403)
          .json(createFailureResponse("Forbidden: Access denied", 403));
      }

      next();
    } catch (error) {
      return res
        .status(401)
        .json(createFailureResponse("Unauthorized: Invalid token", 401));
    }
  };
};

export default auth;
