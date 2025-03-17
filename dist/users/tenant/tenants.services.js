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
exports.tenantsServices = void 0;
const landlords_models_1 = __importDefault(require("../landlord/landlords.models"));
const tenants_models_1 = __importDefault(require("./tenants.models"));
const createRentalRequestIntoDB = (tenantId, rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalData = yield landlords_models_1.default.findById(rentalId).populate("landlordID");
        if (!rentalData) {
            throw new Error("Rental not found.");
        }
        const landlordID = rentalData.landlordID._id;
        const requestWithSameRentalIdAndTenantId = yield tenants_models_1.default.find({
            tenantId,
            rentalId,
        });
        if (requestWithSameRentalIdAndTenantId.length > 0) {
            throw new Error("You have already requested for this rental.");
        }
        const rentalRequest = new tenants_models_1.default({
            tenantId,
            rentalId,
            landlordID,
        });
        yield rentalRequest.save();
        return rentalRequest;
    }
    catch (error) {
        throw new Error(error);
    }
});
const getAllRentalRequestsOfTenantFromDB = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalRequests = yield tenants_models_1.default.find({
            tenantId,
            isDeleted: false,
        }).populate("rentalId");
        return rentalRequests;
    }
    catch (error) {
        throw error;
    }
});
const getSingleRentalRequestOfTenantFromDB = (rentalRequestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalRequests = yield tenants_models_1.default.findById(rentalRequestId)
            .populate("rentalId")
            .populate("tenantId");
        if (!rentalRequests) {
            throw new Error("Rental Request not found.");
        }
        return rentalRequests;
    }
    catch (error) {
        throw error;
    }
});
const deleteRentalRequestFromDB = (rentalRequestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalRequest = yield tenants_models_1.default.findByIdAndDelete(rentalRequestId);
        if (!rentalRequest) {
            throw new Error("Rental Request not found.");
        }
        return rentalRequest;
    }
    catch (error) {
        throw error;
    }
});
const updatePaymentStatusInRentalRequest = (rentalRequestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rentalRequest = yield tenants_models_1.default.findById(rentalRequestId);
        if (!rentalRequest) {
            throw new Error("Rental Request not found.");
        }
        rentalRequest.isPaid = true;
        yield rentalRequest.save();
        return rentalRequest;
    }
    catch (error) {
        throw error;
    }
});
exports.tenantsServices = {
    createRentalRequestIntoDB,
    getAllRentalRequestsOfTenantFromDB,
    getSingleRentalRequestOfTenantFromDB,
    deleteRentalRequestFromDB,
    updatePaymentStatusInRentalRequest,
};
