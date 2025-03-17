"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFailureResponse = createFailureResponse;
function createFailureResponse(message = "An error occurred", statusCode = 500, error = new Error("An error occurred. Please try again or contact support.")) {
    return {
        message,
        statusCode,
        error,
        success: false,
    };
}
