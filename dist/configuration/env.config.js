"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), ".env"),
});
exports.envVars = {
    PORT: process.env.PORT,
    DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
    PASSWORD_HASHING_SALT: process.env.PASSWORD_HASHING_SALT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    BASE_URL: process.env.BASE_URL,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    PAYMENT_SUCCESS_URL: process.env.PAYMENT_SUCCESS_URL,
    PAYMENT_FAILURE_URL: process.env.PAYMENT_FAILURE_URL,
    STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
};
