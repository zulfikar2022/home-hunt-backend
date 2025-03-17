"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rentalRequestSchema = new mongoose_1.Schema({
    tenantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    rentalId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Rental", required: true },
    landlordID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    isPaid: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const RentalRequest = (0, mongoose_1.model)("RentalRequest", rentalRequestSchema);
exports.default = RentalRequest;
