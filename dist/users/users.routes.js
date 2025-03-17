"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("./users.controllers");
const users_validation_1 = require("./users.validation");
const isLoggedIn_1 = require("../utils/isLoggedIn/isLoggedIn");
const userRoutes = (0, express_1.Router)();
// route for creating a user
userRoutes.post("/create-user", (req, res, next) => {
    try {
        users_validation_1.usersValidation.createUserSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
}, users_controllers_1.usersControllers.createUser);
// route for verifying account
userRoutes.get("/verify-account", users_controllers_1.usersControllers.verifyAccount);
// route for login user
userRoutes.post("/login", users_controllers_1.usersControllers.loginUser);
// route for password changing
userRoutes.patch("/change-password", isLoggedIn_1.isLoggedIn, users_controllers_1.usersControllers.changePassword);
// route for logging out user
userRoutes.get("/logout", isLoggedIn_1.isLoggedIn, users_controllers_1.usersControllers.logoutUser);
exports.default = userRoutes;
