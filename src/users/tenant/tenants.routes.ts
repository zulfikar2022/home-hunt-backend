import { Router } from "express";
import { tenantControllers } from "./tenants.controllers";
import { isLoggedIn } from "../../utils/isLoggedIn/isLoggedIn";
import express from "express";

const tenantsRoutes = Router();

// create a new rental request
tenantsRoutes.post(
  "/requests",
  isLoggedIn,
  tenantControllers.createRentalRequest
);

// retrieve all rental requests made by the tenant
tenantsRoutes.get(
  "/requests",
  isLoggedIn,
  tenantControllers.getAllRentalRequestsOfTenant
);

// retrieve a single rental request made by the tenant
tenantsRoutes.get(
  "/requests/:id",
  isLoggedIn,
  tenantControllers.getSingleRentalRequestOfTenant
);

// delete a rental request
tenantsRoutes.delete(
  "/requests/:id",
  isLoggedIn,
  tenantControllers.deleteRentalRequest
);
// update tenant profile
tenantsRoutes.put("/profile");

// route for payment session starting
tenantsRoutes.post(
  "/payment-session",
  isLoggedIn,
  tenantControllers.startPaymentSession
);

// an webhook url for stripe to receive events sent by stripe
// tenantsRoutes.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   tenantControllers.stripeWebhookController
// );
export default tenantsRoutes;
