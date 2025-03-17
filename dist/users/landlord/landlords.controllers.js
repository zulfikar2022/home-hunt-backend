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
Object.defineProperty(exports, "__esModule", { value: true });
exports.landlordsControllers = void 0;
const landlords_services_1 = require("./landlords.services");
const jwt_decode_1 = require("jwt-decode");
const successResponse_1 = require("../../success-error_response/success-response/successResponse");
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const token_decoder_1 = require("../../utils/token-decoder");
const createRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const { id: landlordId, role } = (0, jwt_decode_1.jwtDecode)(token);
    const rental = req.body;
    if (role !== "landlord") {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("Only landlords can create rental listings", 403));
    }
    try {
        const createdRental = yield landlords_services_1.landlordsServices.createRentalIntoDB(rental, landlordId);
        res
            .status(201)
            .json((0, successResponse_1.createSuccessResponse)("Rental created", 201, createdRental));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
const getAllRentalsBasedOnLandlordsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const { id: landlordId, role } = (0, jwt_decode_1.jwtDecode)(token);
    try {
        const rentals = yield landlords_services_1.landlordsServices.getAllRentalsFromDbBasedOnLandlordsId(landlordId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rentals retrieved", 200, rentals));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
const updateSpecificRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const rental = req.body;
    const rentalId = req.params.id;
    const { id: landlordId, role } = (0, jwt_decode_1.jwtDecode)(token);
    if (role !== "landlord") {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("Only landlords can Update rental listings", 403));
    }
    if ((rental === null || rental === void 0 ? void 0 : rental.landlordID) !== landlordId) {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("You are not landlord for the rental.", 403));
    }
    try {
        const updatedRental = yield landlords_services_1.landlordsServices.updateSpecificRentalListingIntoDB(rentalId, rental, landlordId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental Updated Successfully!", 200, updatedRental));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
const deleteSpecificRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const rentalId = req.params.id;
    const { id: landlordId, role } = (0, jwt_decode_1.jwtDecode)(token);
    if (role !== "landlord") {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("Only landlords can Update rental listings", 403));
    }
    try {
        const deletedRental = yield landlords_services_1.landlordsServices.removeARentalListingFromDB(rentalId, landlordId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental Deleted Successfully!", 200, deletedRental));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
const getSpecificRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const rentalId = req.params.id;
    const { id: landlordId, role } = (0, token_decoder_1.tokenDecoder)(token, res);
    try {
        const rental = yield landlords_services_1.landlordsServices.getSpecificRentalListingFromDB(rentalId, landlordId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental retrieved", 200, rental));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
const getRentalRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const { id: landlordId, role } = (0, token_decoder_1.tokenDecoder)(token, res);
    if (role !== "landlord") {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("Only landlords can view rental requests", 403));
    }
    try {
        const rentalRequests = yield landlords_services_1.landlordsServices.getRentalRequestsFromDB(landlordId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental requests retrieved", 200, rentalRequests));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
const changeRentalRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const rentalRequestId = req.params.id;
    const { id: landlordId, role } = (0, token_decoder_1.tokenDecoder)(token, res);
    const { status } = req.body;
    if (role !== "landlord") {
        res
            .status(403)
            .json((0, failureResponse_1.createFailureResponse)("Only landlords can approve or reject rental requests", 403));
    }
    try {
        const rentalRequest = yield landlords_services_1.landlordsServices.changeRentalRequestStatusInDB(rentalRequestId, status, landlordId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental request status updated", 200, rentalRequest));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
exports.landlordsControllers = {
    createRental,
    getAllRentalsBasedOnLandlordsId,
    updateSpecificRental,
    deleteSpecificRental,
    getSpecificRental,
    getRentalRequests,
    changeRentalRequestStatus,
};
