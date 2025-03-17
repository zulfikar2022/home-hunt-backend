"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const token_decoder_1 = require("../token-decoder");
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const adminOnly = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = (0, token_decoder_1.tokenDecoder)(token, res);
    if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) !== "admin") {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("Your are not authorized to access this route", 403));
    }
    next();
};
exports.adminOnly = adminOnly;
