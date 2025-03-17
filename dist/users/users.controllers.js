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
exports.usersControllers = void 0;
const uesrs_services_1 = require("./uesrs.services");
const successResponse_1 = require("../success-error_response/success-response/successResponse");
const failureResponse_1 = require("../success-error_response/failure-response/failureResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../configuration/env.config");
const path_1 = __importDefault(require("path"));
const token_decoder_1 = require("../utils/token-decoder");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const userResponse = yield uesrs_services_1.usersServices.crateUserIntoDB(user);
        res.send((0, successResponse_1.createSuccessResponse)("User created successfully. ", 201, userResponse));
    }
    catch (error) {
        res
            .status(500)
            .send((0, failureResponse_1.createFailureResponse)(error.message || "User creation failed", 500, error));
    }
});
const verifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.envVars.JWT_PRIVATE_KEY);
        yield uesrs_services_1.usersServices.verifyAccount(decoded.id);
        res
            .status(200)
            .sendFile(path_1.default.join(process.cwd(), "/static/verifications/success.html"));
    }
    catch (error) {
        res
            .status(500)
            .sendFile(path_1.default.join(process.cwd(), "/static/verifications/failure.html"));
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginCredentials = req.body;
    try {
        const userAccess = yield uesrs_services_1.usersServices.loginUserIntoDB(loginCredentials);
        res
            .cookie("accessToken", userAccess.token, { httpOnly: true })
            .status(200)
            .send((0, successResponse_1.createSuccessResponse)("User logged in successfully", 200, userAccess));
    }
    catch (error) {
        res
            .status(500)
            .send((0, failureResponse_1.createFailureResponse)(error.message || "User login failed", 500, error));
    }
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const { id: userId } = (0, token_decoder_1.tokenDecoder)(req.headers.authorization, res);
    if (!oldPassword || !newPassword) {
        res
            .status(400)
            .send((0, failureResponse_1.createFailureResponse)("Old password and new password both are required", 400));
    }
    try {
        const userResponse = yield uesrs_services_1.usersServices.changePasswordIntoDB(userId, oldPassword, newPassword);
        res.send((0, successResponse_1.createSuccessResponse)("Password changed successfully", 200, userResponse));
    }
    catch (error) {
        res
            .status(500)
            .send((0, failureResponse_1.createFailureResponse)(error.message || "Password change failed", 500, error));
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken");
        res
            .status(200)
            .send({ message: "User logged out successfully", success: true });
    }
    catch (error) {
        res
            .status(500)
            .send((0, failureResponse_1.createFailureResponse)(error.message || "User logout failed", 500, error));
    }
});
exports.usersControllers = {
    createUser,
    verifyAccount,
    loginUser,
    changePassword,
    logoutUser,
};
