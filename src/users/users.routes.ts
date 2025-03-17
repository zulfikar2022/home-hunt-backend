import { NextFunction, Request, Response, Router } from "express";
import { createSuccessResponse } from "../success-error_response/success-response/successResponse";
import { usersControllers } from "./users.controllers";
import { usersValidation } from "./users.validation";
import { isLoggedIn } from "../utils/isLoggedIn/isLoggedIn";

const userRoutes = Router();

// route for creating a user
userRoutes.post(
  "/create-user",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      usersValidation.createUserSchema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  },
  usersControllers.createUser
);

// route for verifying account
userRoutes.get("/verify-account", usersControllers.verifyAccount);

// route for login user
userRoutes.post("/login", usersControllers.loginUser);

// route for password changing
userRoutes.patch(
  "/change-password",
  isLoggedIn,
  usersControllers.changePassword
);

// route for logging out user
userRoutes.get("/logout", isLoggedIn, usersControllers.logoutUser);

export default userRoutes;
