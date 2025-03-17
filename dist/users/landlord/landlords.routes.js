"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landlords_controllers_1 = require("./landlords.controllers");
const isLoggedIn_1 = require("../../utils/isLoggedIn/isLoggedIn");
const landlords_verification_1 = require("./landlords.verification");
const landlordRoutes = (0, express_1.Router)();
// create a new rental house listing
landlordRoutes.post("/listings", isLoggedIn_1.isLoggedIn, (req, res, next) => {
    try {
        landlords_verification_1.rentalValidations.rentalVerificationSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
}, landlords_controllers_1.landlordsControllers.createRental);
// retrieve all rental house listings of specific landlord
landlordRoutes.get("/listings", isLoggedIn_1.isLoggedIn, landlords_controllers_1.landlordsControllers.getAllRentalsBasedOnLandlordsId);
// retrieve a specific rental house listing based on the _id
landlordRoutes.get("/listings/:id", isLoggedIn_1.isLoggedIn, landlords_controllers_1.landlordsControllers.getSpecificRental);
// update a specific rental house listing
landlordRoutes.put("/listings/:id", isLoggedIn_1.isLoggedIn, landlords_controllers_1.landlordsControllers.updateSpecificRental);
// remove a rental listing
landlordRoutes.delete("/listings/:id", isLoggedIn_1.isLoggedIn, landlords_controllers_1.landlordsControllers.deleteSpecificRental);
// retrieve all rental requests for the listings posted by the landlord
landlordRoutes.get("/requests", isLoggedIn_1.isLoggedIn, landlords_controllers_1.landlordsControllers.getRentalRequests);
// approve or reject a rental request
landlordRoutes.put("/requests/:id", isLoggedIn_1.isLoggedIn, (req, res, next) => {
    try {
        landlords_verification_1.rentalValidations.rentalResponseSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
}, landlords_controllers_1.landlordsControllers.changeRentalRequestStatus);
exports.default = landlordRoutes;
