"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecoder = void 0;
const jwt_decode_1 = require("jwt-decode");
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const tokenDecoder = (token, res) => {
    const decodeToken = (0, jwt_decode_1.jwtDecode)(token);
    if (!decodeToken) {
        res.status(401).json((0, failureResponse_1.createFailureResponse)("Invalid token", 401));
    }
    return decodeToken;
};
exports.tokenDecoder = tokenDecoder;
