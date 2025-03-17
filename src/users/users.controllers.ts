import { Request, Response } from "express";
import { usersServices } from "./uesrs.services";
import { createSuccessResponse } from "../success-error_response/success-response/successResponse";
import { createFailureResponse } from "../success-error_response/failure-response/failureResponse";
import jwt from "jsonwebtoken";
import { envVars } from "../configuration/env.config";
import path from "path";
import { tokenDecoder } from "../utils/token-decoder";

export interface ITokenPayload {
  id: string;
  email: string;
  role: string;
  profileImage: string;
}

const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const userResponse = await usersServices.crateUserIntoDB(user);
    res.send(
      createSuccessResponse("User created successfully. ", 201, userResponse)
    );
  } catch (error: any) {
    res
      .status(500)
      .send(
        createFailureResponse(
          error.message || "User creation failed",
          500,
          error
        )
      );
  }
};

const verifyAccount = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  try {
    const decoded: ITokenPayload = jwt.verify(
      token,
      envVars.JWT_PRIVATE_KEY!
    ) as ITokenPayload;

    await usersServices.verifyAccount(decoded.id);

    res
      .status(200)
      .sendFile(path.join(process.cwd(), "/static/verifications/success.html"));
  } catch (error: any) {
    res
      .status(500)
      .sendFile(path.join(process.cwd(), "/static/verifications/failure.html"));
  }
};

const loginUser = async (req: Request, res: Response) => {
  const loginCredentials = req.body;

  try {
    const userAccess = await usersServices.loginUserIntoDB(loginCredentials);
    res
      .cookie("accessToken", userAccess.token, { httpOnly: true })
      .status(200)
      .send(
        createSuccessResponse("User logged in successfully", 200, userAccess)
      );
  } catch (error: any) {
    res
      .status(500)
      .send(
        createFailureResponse(error.message || "User login failed", 500, error)
      );
  }
};

const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const { id: userId } = tokenDecoder(req.headers.authorization!, res);

  if (!oldPassword || !newPassword) {
    res
      .status(400)
      .send(
        createFailureResponse(
          "Old password and new password both are required",
          400
        )
      );
  }

  try {
    const userResponse = await usersServices.changePasswordIntoDB(
      userId,
      oldPassword,
      newPassword
    );
    res.send(
      createSuccessResponse("Password changed successfully", 200, userResponse)
    );
  } catch (error: any) {
    res
      .status(500)
      .send(
        createFailureResponse(
          error.message || "Password change failed",
          500,
          error
        )
      );
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res
      .status(200)
      .send({ message: "User logged out successfully", success: true });
  } catch (error: any) {
    res
      .status(500)
      .send(
        createFailureResponse(error.message || "User logout failed", 500, error)
      );
  }
};

export const usersControllers = {
  createUser,
  verifyAccount,
  loginUser,
  changePassword,
  logoutUser,
};
