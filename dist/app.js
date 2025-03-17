"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const failureResponse_1 = require("./success-error_response/failure-response/failureResponse");
const tenants_controllers_1 = require("./users/tenant/tenants.controllers");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
// app.use("/webhook", express.raw({ type: "application/json" }));
exports.app.post("/webhook", 
// bodyParser.raw({ type: "application/json" }),
express_1.default.raw({ type: "application/json" }), tenants_controllers_1.tenantControllers.stripeWebhookController);
exports.app.use(express_1.default.json());
exports.app.use("/api/v1", routes_1.default);
exports.app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
// Error handling middleware
exports.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send((0, failureResponse_1.createFailureResponse)(err.message, 500, err));
});
