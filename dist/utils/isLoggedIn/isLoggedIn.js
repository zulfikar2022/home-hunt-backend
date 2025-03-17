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
exports.isLoggedIn = void 0;
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../../configuration/env.config");
const users_models_1 = __importDefault(require("../../users/users.models"));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!token) {
        res.status(401).json((0, failureResponse_1.createFailureResponse)("No token provided", 401));
    }
    try {
        // verify the token
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.envVars.JWT_PRIVATE_KEY);
        const { id, email, role } = decoded;
        const userWithId = yield users_models_1.default.findById(id);
        if ((userWithId === null || userWithId === void 0 ? void 0 : userWithId.isDeactivated) || !(userWithId === null || userWithId === void 0 ? void 0 : userWithId.isVerified)) {
            res.status(404).json((0, failureResponse_1.createFailureResponse)("User not found", 404));
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.isLoggedIn = isLoggedIn;
