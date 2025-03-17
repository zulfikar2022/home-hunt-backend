import { NextFunction, Request, Response } from "express";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";
import jwt from "jsonwebtoken";
import { envVars } from "../../configuration/env.config";
import User from "../../users/users.models";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.headers?.authorization;
  if (!token) {
    res.status(401).json(createFailureResponse("No token provided", 401));
  }
  try {
    // verify the token
    const decoded = jwt.verify(token!, envVars.JWT_PRIVATE_KEY!);
    const { id, email, role } = decoded as {
      id: string;
      email: string;
      role: string;
    };
    const userWithId = await User.findById(id);
    if (userWithId?.isDeactivated || !userWithId?.isVerified) {
      res.status(404).json(createFailureResponse("User not found", 404));
    }
    next();
  } catch (error: any) {
    next(error);
  }
};
