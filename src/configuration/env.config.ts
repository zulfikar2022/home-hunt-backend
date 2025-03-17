import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const envVars = {
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
