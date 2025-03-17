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
exports.landlordsServices = void 0;
const tenants_models_1 = __importDefault(require("../tenant/tenants.models"));
const users_models_1 = __importDefault(require("../users.models"));
const landlords_models_1 = __importDefault(require("./landlords.models"));
const createRentalIntoDB = (rental, landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landlord = yield users_models_1.default.findById(landlordId);
        if (!landlord) {
            throw new Error("Landlord not found");
        }
        if (landlord.isDeleted) {
            throw new Error("Landlord is deleted");
        }
        if (landlord.isDeactivated) {
            throw new Error("Landlord is deactivated");
        }
        const newHouseListing = new landlords_models_1.default(Object.assign(Object.assign({}, rental), { landlordID: landlordId }));
        const createdRental = yield newHouseListing.save();
        return createdRental;
    }
    catch (error) {
        throw new Error(error);
    }
});
const getAllRentalsFromDbBasedOnLandlordsId = (landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landlord = yield users_models_1.default.findById(landlordId);
        if (!landlord) {
            throw new Error("Landlord not found");
        }
        if (landlord.isDeleted) {
            throw new Error("Landlord is deleted");
        }
        if (landlord.isDeactivated) {
            throw new Error("Landlord is deactivated");
        }
        const rentals = yield landlords_models_1.default.find({
            landlordID: landlordId,
            isDeleted: false,
        });
        return rentals;
    }
    catch (error) {
        throw error;
    }
});
const getSpecificRentalListingFromDB = (rentalId, landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landlord = yield users_models_1.default.findById(landlordId);
        if (!landlord) {
            throw new Error("Landlord not found");
        }
        if (landlord.isDeleted) {
            throw new Error("Landlord is deleted");
        }
        if (landlord.isDeactivated) {
            throw new Error("Landlord is deactivated");
        }
        const rental = yield landlords_models_1.default.findById(rentalId).populate("landlordID");
        if (!rental) {
            throw new Error("Rental not found");
        }
        return rental;
    }
    catch (error) {
        throw error;
    }
});
const updateSpecificRentalListingIntoDB = (rentalId, rental, landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landlord = yield users_models_1.default.findById(landlordId);
        if (!landlord) {
            throw new Error("Landlord not found");
        }
        if (landlord.isDeleted) {
            throw new Error("Landlord is deleted");
        }
        if (landlord.isDeactivated) {
            throw new Error("Landlord is deactivated");
        }
        const updatedRental = yield landlords_models_1.default.findByIdAndUpdate(rentalId, rental, {
            new: true,
        });
        return updatedRental;
    }
    catch (error) {
        throw error;
    }
});
const removeARentalListingFromDB = (rentalId, landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landlord = yield users_models_1.default.findById(landlordId);
        if (!landlord) {
            throw new Error("Landlord not found");
        }
        if (landlord.isDeleted) {
            throw new Error("Landlord is deleted");
        }
        if (landlord.isDeactivated) {
            throw new Error("Landlord is deactivated");
        }
        const rental = yield landlords_models_1.default.findById(rentalId);
        if (!rental) {
            throw new Error("Rental not found");
        }
        if (rental.isDeleted) {
            throw new Error("Rental already deleted");
        }
        if ((rental === null || rental === void 0 ? void 0 : rental.landlordID).toString() !== landlordId) {
            throw new Error("This is not your rental!");
        }
        rental.isDeleted = true;
        yield rental.save();
        return rental;
    }
    catch (error) {
        throw error;
    }
});
const getRentalRequestsFromDB = (landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landlord = yield users_models_1.default.findById(landlordId);
        if (!landlord) {
            throw new Error("Landlord not found");
        }
        if (landlord.isDeleted) {
            throw new Error("Landlord is deleted");
        }
        if (landlord.isDeactivated) {
            throw new Error("Landlord is deactivated");
        }
        const rentalRequests = yield tenants_models_1.default.find({
            landlordID: landlordId,
            status: "pending",
        }).populate("tenantId rentalId landlordID");
        return rentalRequests;
    }
    catch (error) {
        throw error;
    }
});
const changeRentalRequestStatusInDB = (rentalRequestId, status, landlordId) => __awaiter(void 0, void 0, void 0, function* () {
    const landlord = yield users_models_1.default.findById(landlordId);
    if (!landlord) {
        throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
        throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
        throw new Error("Landlord is deactivated");
    }
    if (status !== "approved" && status !== "rejected") {
        throw new Error("Invalid status");
    }
    try {
        const rentalRequest = yield tenants_models_1.default.findById(rentalRequestId);
        if (!rentalRequest) {
            throw new Error("Rental request not found");
        }
        if (rentalRequest.status === "rejected") {
            throw new Error("Rental request already rejected");
        }
        rentalRequest.status = status;
        yield rentalRequest.save();
        return rentalRequest;
    }
    catch (error) {
        throw error;
    }
});
exports.landlordsServices = {
    createRentalIntoDB,
    getAllRentalsFromDbBasedOnLandlordsId,
    updateSpecificRentalListingIntoDB,
    removeARentalListingFromDB,
    getSpecificRentalListingFromDB,
    getRentalRequestsFromDB,
    changeRentalRequestStatusInDB,
};
