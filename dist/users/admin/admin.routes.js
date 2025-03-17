"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isLoggedIn_1 = require("../../utils/isLoggedIn/isLoggedIn");
const admin_controllers_1 = require("./admin.controllers");
const adminOnly_1 = require("../../utils/admin-only/adminOnly");
const adminRoutes = (0, express_1.Router)();
//  ALL ADMIN ROUTES ARE HERE
// retrieve all users (DONE)
adminRoutes.get("/users", isLoggedIn_1.isLoggedIn, adminOnly_1.adminOnly, admin_controllers_1.adminControllers.getUsers);
// update user roles (NOT DONE)
adminRoutes.put("/users/:id", isLoggedIn_1.isLoggedIn, adminOnly_1.adminOnly);
// deactivate a user (DONE)
adminRoutes.delete("/users/:id", isLoggedIn_1.isLoggedIn, adminOnly_1.adminOnly, admin_controllers_1.adminControllers.deleteAUser);
// change users active status
adminRoutes.get("/users/change-status/:id", isLoggedIn_1.isLoggedIn, adminOnly_1.adminOnly, admin_controllers_1.adminControllers.changeUsersActiveStatus);
// retrieve all rental house listings (DONE)
adminRoutes.get("/listings", isLoggedIn_1.isLoggedIn, adminOnly_1.adminOnly, admin_controllers_1.adminControllers.getAllRentalHouseListings);
// delete a rental house listing (DONE)
adminRoutes.delete("/listings/:id", isLoggedIn_1.isLoggedIn, adminOnly_1.adminOnly, admin_controllers_1.adminControllers.deleteARentalHouseListing);
exports.default = adminRoutes;
