"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = void 0;
const env_config_1 = require("../configuration/env.config");
const users_models_1 = __importDefault(require("./users.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crateUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Create user into DB
    const { email } = user;
    try {
        const isUserExist = yield users_models_1.default.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists");
        }
        const newUser = new users_models_1.default(user);
        yield newUser.save();
        newUser.password = "";
        const tokenData = {
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        };
        // create a token using jwt with data as tokenData
        const token = jsonwebtoken_1.default.sign(tokenData, env_config_1.envVars.JWT_PRIVATE_KEY, {
            expiresIn: "10d",
        });
        // const href = envVars.BASE_URL + `/users/verify-account?token=${token}`;
        // await sendMail(
        //   newUser.email,
        //   "Account Verification",
        //   `<h1>Welcome ${newUser.name},</h1><p>Please click <a href="${href}">here</a> to verify your account.</p>`
        // );
        return newUser;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
});
const verifyAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findOne({ _id: id });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.isVerified) {
            throw new Error("Account already verified");
        }
        user.isVerified = true;
        yield user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
});
const loginUserIntoDB = (loginCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    // find user using email
    const { email, password } = loginCredentials;
    try {
        const user = yield users_models_1.default.findOne({
            email,
        }, "+password");
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
        const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
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
        const token = jsonwebtoken_1.default.sign(tokenData, env_config_1.envVars.JWT_PRIVATE_KEY, {
            expiresIn: "10d",
        });
        return { user, token };
    }
    catch (error) {
        throw error;
    }
});
const changePasswordIntoDB = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById(userId, "+password");
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordMatched = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (!isPasswordMatched) {
            throw new Error("Invalid old password");
        }
        user.password = newPassword;
        const updatedUser = yield user.save();
        updatedUser.password = "";
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.usersServices = {
    crateUserIntoDB,
    verifyAccount,
    loginUserIntoDB,
    changePasswordIntoDB,
};
