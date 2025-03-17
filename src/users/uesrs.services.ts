import { envVars } from "../configuration/env.config";
import { sendMail } from "../utils/nodemailer/nodemailer";
import User, { IUser } from "./users.models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const crateUserIntoDB = async (user: IUser) => {
  // Create user into DB
  const { email } = user;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists");
    }

    const newUser = new User(user);
    await newUser.save();
    newUser.password = "";
    const tokenData = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    // create a token using jwt with data as tokenData
    const token = jwt.sign(tokenData, envVars.JWT_PRIVATE_KEY!, {
      expiresIn: "10d",
    });

    // const href = envVars.BASE_URL + `/users/verify-account?token=${token}`;
    // await sendMail(
    //   newUser.email,
    //   "Account Verification",
    //   `<h1>Welcome ${newUser.name},</h1><p>Please click <a href="${href}">here</a> to verify your account.</p>`
    // );
    return newUser;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

const verifyAccount = async (id: string) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isVerified) {
      throw new Error("Account already verified");
    }
    user.isVerified = true;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUserIntoDB = async (loginCredentials: {
  email: string;
  password: string;
}) => {
  // find user using email
  const { email, password } = loginCredentials;
  try {
    const user = await User.findOne(
      {
        email,
      },
      "+password"
    );
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.isVerified) {
      throw new Error("Account not verified");
    }
    if (user.isDeactivated) {
      throw new Error("Account is deactivated");
    }
    if (user.isDeleted) {
      throw new Error("Account is deleted");
    }

    // compare password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new Error("Invalid password");
    }
    // create a token using jwt with data as tokenData
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      name: user.name,
    };
    user.password = "";
    const token = jwt.sign(tokenData, envVars.JWT_PRIVATE_KEY!, {
      expiresIn: "10d",
    });
    return { user, token };
  } catch (error: any) {
    throw error;
  }
};

const changePasswordIntoDB = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user = await User.findById(userId, "+password");
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      throw new Error("Invalid old password");
    }

    user.password = newPassword;
    const updatedUser = await user.save();
    updatedUser.password = "";
    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

export const usersServices = {
  crateUserIntoDB,
  verifyAccount,
  loginUserIntoDB,
  changePasswordIntoDB,
};
