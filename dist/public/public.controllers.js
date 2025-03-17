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
exports.publicControllers = void 0;
const failureResponse_1 = require("../success-error_response/failure-response/failureResponse");
const public_services_1 = require("./public.services");
const getRentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { location, rentAmount, numberOfBedrooms } = req.query;
    try {
        const rentals = yield public_services_1.publicServices.getAllRentalsFromDB(page, limit, {
            location: location,
            rentAmount: rentAmount === undefined || rentAmount === ""
                ? undefined
                : parseFloat(rentAmount),
            numberOfBedrooms: numberOfBedrooms === undefined || numberOfBedrooms === ""
                ? undefined
                : parseInt(numberOfBedrooms),
        });
        res.status(200).json({
            status: "success",
            data: rentals,
        });
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal Server Error", 500));
    }
});
const getRentalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rental = yield public_services_1.publicServices.getRentalByIdFromDB(id);
        res.status(200).json({
            status: "success",
            data: rental,
        });
    }
    catch (error) {
        res
            .status(500)
            .json((0, failureResponse_1.createFailureResponse)(error.message || "Internal Server Error", 500));
    }
});
exports.publicControllers = {
    getRentals,
    getRentalById,
};
