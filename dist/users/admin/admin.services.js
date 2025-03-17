"use strict";
// Assuming you have a User model
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
exports.adminServices = void 0;
const landlords_models_1 = __importDefault(require("../landlord/landlords.models"));
const users_models_1 = __importDefault(require("../users.models"));
const getAllUsersFromDb = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const totalUsers = yield users_models_1.default.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);
    const users = yield users_models_1.default.find({ isDeleted: false }).skip(skip).limit(limit);
    return {
        users,
        metadata: {
            currentPage: page,
            totalPages,
            eachPageItem: limit,
        },
    };
});
const deactivateUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById(userId, { isDeactivated: false });
        if (!user) {
            throw new Error("User not found");
        }
        user.isDeactivated = true;
        yield user.save();
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getAllRentalHouseListingsFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const totalRentals = yield landlords_models_1.default.countDocuments();
    const totalPages = Math.ceil(totalRentals / limit);
    try {
        const rentals = yield landlords_models_1.default.find({ isDeleted: false })
            .skip(skip)
            .limit(limit)
            .populate("landlordID");
        return {
            rentals,
            metadata: {
                currentPage: page,
                totalPages,
                eachPageItem: limit,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
const deleteARentalHouseListingFromDB = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rental = yield landlords_models_1.default.findById(rentalId);
        if (!rental) {
            throw new Error("Rental not found");
        }
        if (rental.isDeleted) {
            throw new Error("Rental already deleted");
        }
        rental.isDeleted = true;
        yield rental.save();
        return rental;
    }
    catch (error) {
        throw error;
    }
});
const deleteAUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.role === "admin") {
            throw new Error("Cannot delete an admin");
        }
        user.isDeleted = true;
        yield user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
});
const changeUserActiveStatusIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.role === "admin") {
            throw new Error("Cannot change an admin's active status");
        }
        user.isDeactivated = !user.isDeactivated;
        user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.adminServices = {
    getAllUsersFromDb,
    deactivateUserIntoDB,
    getAllRentalHouseListingsFromDB,
    deleteARentalHouseListingFromDB,
    deleteAUserFromDB,
    changeUserActiveStatusIntoDB,
};
