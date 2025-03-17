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
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("../../configuration/env.config");
// Email transporter configuration
const transporter = nodemailer_1.default.createTransport({
    service: "gmail", // Use "gmail" or your SMTP service provider
    auth: {
        user: env_config_1.envVars.EMAIL_USER, // Your email address
        pass: env_config_1.envVars.EMAIL_PASS, // Your email password or app-specific password
    },
});
// Function to send email
function sendMail(to, subject, htmlContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailOptions = {
                from: env_config_1.envVars.EMAIL_USER, // Sender email
                to,
                subject,
                html: htmlContent, // HTML email body
            };
            const info = yield transporter.sendMail(mailOptions);
            return info;
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    });
}
