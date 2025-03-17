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
exports.publicServices = void 0;
const landlords_models_1 = __importDefault(require("../users/landlord/landlords.models"));
const getAllRentalsFromDB = (page, limit, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    // Construct query dynamically
    const query = {};
    if (filters.location) {
        query.location = { $regex: filters.location, $options: "i" };
    }
    if (filters.rentAmount !== undefined) {
        query.rentAmount = { $lte: filters.rentAmount };
    }
    if (filters.numberOfBedrooms !== undefined) {
        query.numberOfBedrooms = { $lte: filters.numberOfBedrooms };
    }
    try {
        // Get total matching documents count
        const totalItems = yield landlords_models_1.default.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);
        // Fetch paginated results
        const rentals = yield landlords_models_1.default.find(query).skip(skip).limit(limit);
        // Prepare response with metadata
        return {
            metadata: {
                currentPage: page,
                totalPages: totalPages,
                eachPageItem: rentals.length,
            },
            rentals,
        };
    }
    catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
});
const getRentalByIdFromDB = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rental = yield landlords_models_1.default.findById(rentalId);
        if (!rental) {
            throw new Error("Rental not found");
        }
        return rental;
    }
    catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
});
exports.publicServices = {
    getAllRentalsFromDB,
    getRentalByIdFromDB,
};
