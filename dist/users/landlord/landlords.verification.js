"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalValidations = void 0;
const zod_1 = require("zod");
const rentalVerificationSchema = zod_1.z.object({
    location: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
    rentAmount: zod_1.z.number().positive(),
    numberOfBedrooms: zod_1.z.number().positive(),
    images: zod_1.z.array(zod_1.z.string().url()).optional(),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
});
const rentalResponseSchema = zod_1.z.object({
    status: zod_1.z.enum(["approved", "rejected"]),
});
exports.rentalValidations = {
    rentalVerificationSchema,
    rentalResponseSchema,
};
/*



*/
