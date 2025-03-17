"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenants_controllers_1 = require("./tenants.controllers");
const isLoggedIn_1 = require("../../utils/isLoggedIn/isLoggedIn");
const tenantsRoutes = (0, express_1.Router)();
// create a new rental request
tenantsRoutes.post("/requests", isLoggedIn_1.isLoggedIn, tenants_controllers_1.tenantControllers.createRentalRequest);
// retrieve all rental requests made by the tenant
tenantsRoutes.get("/requests", isLoggedIn_1.isLoggedIn, tenants_controllers_1.tenantControllers.getAllRentalRequestsOfTenant);
// retrieve a single rental request made by the tenant
tenantsRoutes.get("/requests/:id", isLoggedIn_1.isLoggedIn, tenants_controllers_1.tenantControllers.getSingleRentalRequestOfTenant);
// delete a rental request
tenantsRoutes.delete("/requests/:id", isLoggedIn_1.isLoggedIn, tenants_controllers_1.tenantControllers.deleteRentalRequest);
// update tenant profile
tenantsRoutes.put("/profile");
// route for payment session starting
tenantsRoutes.post("/payment-session", isLoggedIn_1.isLoggedIn, tenants_controllers_1.tenantControllers.startPaymentSession);
// an webhook url for stripe to receive events sent by stripe
// tenantsRoutes.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   tenantControllers.stripeWebhookController
// );
exports.default = tenantsRoutes;
