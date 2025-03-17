"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = createSuccessResponse;
function createSuccessResponse(message = "Request successful", statusCode = 200, data) {
    return {
        message,
        statusCode,
        data,
        success: true,
    };
}
