import { Router } from "express";
import { isLoggedIn } from "../../utils/isLoggedIn/isLoggedIn";
import { adminControllers } from "./admin.controllers";
import { adminOnly } from "../../utils/admin-only/adminOnly";

const adminRoutes = Router();
//  ALL ADMIN ROUTES ARE HERE

// retrieve all users (DONE)
adminRoutes.get("/users", isLoggedIn, adminOnly, adminControllers.getUsers);

// update user roles (NOT DONE)
adminRoutes.put("/users/:id", isLoggedIn, adminOnly);

// deactivate a user (DONE)
adminRoutes.delete(
  "/users/:id",
  isLoggedIn,
  adminOnly,
  adminControllers.deleteAUser
);
// change users active status
adminRoutes.get(
  "/users/change-status/:id",
  isLoggedIn,
  adminOnly,
  adminControllers.changeUsersActiveStatus
);

// retrieve all rental house listings (DONE)
adminRoutes.get(
  "/listings",
  isLoggedIn,
  adminOnly,
  adminControllers.getAllRentalHouseListings
);

// delete a rental house listing (DONE)
adminRoutes.delete(
  "/listings/:id",
  isLoggedIn,
  adminOnly,
  adminControllers.deleteARentalHouseListing
);

export default adminRoutes;
