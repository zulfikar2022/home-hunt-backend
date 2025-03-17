"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const env_config_1 = require("../../configuration/env.config");
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Landlord"] = "landlord";
    UserRole["Tenant"] = "tenant";
})(UserRole || (exports.UserRole = UserRole = {}));
const auth = (allowedRoles) => {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(401)
                .json((0, failureResponse_1.createFailureResponse)("Unauthorized: No token provided", 401));
        }
        try {
            const secretKey = env_config_1.envVars.JWT_PRIVATE_KEY;
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            if (!allowedRoles.includes(decoded.role)) {
                return res
                    .status(403)
                    .json((0, failureResponse_1.createFailureResponse)("Forbidden: Access denied", 403));
            }
            next();
        }
        catch (error) {
            return res
                .status(401)
                .json((0, failureResponse_1.createFailureResponse)("Unauthorized: Invalid token", 401));
        }
    };
};
exports.default = auth;
