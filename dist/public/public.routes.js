"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_controllers_1 = require("./public.controllers");
const publicRoutes = (0, express_1.Router)();
// get all rentals
publicRoutes.get("/rentals", public_controllers_1.publicControllers.getRentals);
// get rental by id
publicRoutes.get("/rentals/:id", public_controllers_1.publicControllers.getRentalById);
exports.default = publicRoutes;
