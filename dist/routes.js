"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./users/users.routes"));
const landlords_routes_1 = __importDefault(require("./users/landlord/landlords.routes"));
const tenants_routes_1 = __importDefault(require("./users/tenant/tenants.routes"));
const admin_routes_1 = __importDefault(require("./users/admin/admin.routes"));
const public_routes_1 = __importDefault(require("./public/public.routes"));
const routes = [
    {
        path: "/users",
        route: users_routes_1.default,
    },
    {
        path: "/landlords",
        route: landlords_routes_1.default,
    },
    {
        path: "/tenants",
        route: tenants_routes_1.default,
    },
    {
        path: "/admin",
        route: admin_routes_1.default,
    },
    {
        path: "/public",
        route: public_routes_1.default,
    },
];
const router = (0, express_1.Router)();
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
