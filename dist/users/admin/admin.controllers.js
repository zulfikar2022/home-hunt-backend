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
exports.adminControllers = void 0;
const admin_services_1 = require("./admin.services");
const successResponse_1 = require("../../success-error_response/success-response/successResponse");
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = yield admin_services_1.adminServices.getAllUsersFromDb(page, limit);
        res.status(200).json((0, successResponse_1.createSuccessResponse)("Users retrieved", 200, users));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)("Internal server error", 500));
    }
});
const deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield admin_services_1.adminServices.deactivateUserIntoDB(id);
        res.status(200).json((0, successResponse_1.createSuccessResponse)("User deleted", 200, user));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal Server Error", 500));
    }
});
const getAllRentalHouseListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const rentals = yield admin_services_1.adminServices.getAllRentalHouseListingsFromDB(page, limit);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rentals retrieved", 200, rentals));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)("Internal server error", 500));
    }
});
const deleteARentalHouseListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rental = yield admin_services_1.adminServices.deleteARentalHouseListingFromDB(id);
        res.status(200).json((0, successResponse_1.createSuccessResponse)("Rental deleted", 200, rental));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal Server Error", 500));
    }
});
const deleteAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield admin_services_1.adminServices.deleteAUserFromDB(id);
        res.status(200).json((0, successResponse_1.createSuccessResponse)("User deleted", 200, user));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal Server Error", 500));
    }
});
const changeUsersActiveStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield admin_services_1.adminServices.changeUserActiveStatusIntoDB(id);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("User status changed", 200, user));
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal server error", 500));
    }
});
exports.adminControllers = {
    getUsers,
    deactivateUser,
    getAllRentalHouseListings,
    deleteARentalHouseListing,
    deleteAUser,
    changeUsersActiveStatus,
};
