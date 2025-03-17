"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantControllers = void 0;
const token_decoder_1 = require("../../utils/token-decoder");
const failureResponse_1 = require("../../success-error_response/failure-response/failureResponse");
const tenants_services_1 = require("./tenants.services");
const successResponse_1 = require("../../success-error_response/success-response/successResponse");
const env_config_1 = require("../../configuration/env.config");
const stripe_1 = __importDefault(require("stripe"));
const createRentalRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const rentalId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.rentalId;
    if (!rentalId) {
        res.status(401).json((0, failureResponse_1.createFailureResponse)("No rentalId provided.", 401));
    }
    const decodedData = (0, token_decoder_1.tokenDecoder)(token, res);
    const { role, id } = decodedData;
    if (role !== "tenant") {
        res
            .status(401)
            .json((0, failureResponse_1.createFailureResponse)("Only tenant can request for rental.", 401));
    }
    try {
        const rentalRequest = yield tenants_services_1.tenantsServices.createRentalRequestIntoDB(id, rentalId);
        res
            .status(201)
            .json((0, successResponse_1.createSuccessResponse)("Rental Request created Successfully!", 201, rentalRequest));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)(error.message, 500));
    }
});
const getAllRentalRequestsOfTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const decodedData = (0, token_decoder_1.tokenDecoder)(token, res);
    const { id } = decodedData;
    try {
        const rentalRequests = yield tenants_services_1.tenantsServices.getAllRentalRequestsOfTenantFromDB(id);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("All rental requests fetched successfully!", 200, rentalRequests));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)(error.message, 500));
    }
});
const getSingleRentalRequestOfTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentalRequestId = req.params.id;
    try {
        const rentalRequest = yield tenants_services_1.tenantsServices.getSingleRentalRequestOfTenantFromDB(rentalRequestId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental request fetched successfully!", 200, rentalRequest));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)(error.message, 500));
    }
});
const deleteRentalRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const rentalRequestId = req.params.id;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const decodedData = (0, token_decoder_1.tokenDecoder)(token, res);
    const { role } = decodedData;
    if (role !== "tenant") {
        res
            .status(401)
            .json((0, failureResponse_1.createFailureResponse)("Only tenant can delete rental request.", 401));
    }
    try {
        const rentalRequest = yield tenants_services_1.tenantsServices.deleteRentalRequestFromDB(rentalRequestId);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Rental request deleted successfully!", 200, rentalRequest));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)(error.message, 500));
    }
});
const startPaymentSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rentalRequestId, price } = req.body;
        const stripe = new stripe_1.default(env_config_1.envVars.STRIPE_SECRET_KEY, {
            apiVersion: "2025-02-24.acacia",
        });
        const stripeObjectToPayment = {
            payment_method_types: [
                "card",
            ],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Rental Payment",
                            description: "Payment for rental request",
                            // id: rentalRequestId,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                rentalRequestId,
            },
            mode: "payment",
            success_url: env_config_1.envVars.PAYMENT_SUCCESS_URL,
            cancel_url: env_config_1.envVars.PAYMENT_FAILURE_URL,
        };
        const session = yield stripe.checkout.sessions.create(stripeObjectToPayment);
        res
            .status(200)
            .json((0, successResponse_1.createSuccessResponse)("Payment session started", 200, session));
    }
    catch (error) {
        res.status(500).json((0, failureResponse_1.createFailureResponse)(error.message, 500));
    }
});
const stripeWebhookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sig = req.headers["stripe-signature"];
    let event;
    const stripe = new stripe_1.default(env_config_1.envVars.STRIPE_SECRET_KEY, {
        apiVersion: "2025-02-24.acacia",
    });
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, env_config_1.envVars.STRIPE_ENDPOINT_SECRET);
        // Handle the event
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                console.log("Payment was successful for session:", session.id);
                // Handle successful payment (e.g., update database, send confirmation email)
                const rentalRequestId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.rentalRequestId;
                console.log("Rental Request ID:", rentalRequestId);
                tenants_services_1.tenantsServices.updatePaymentStatusInRentalRequest(rentalRequestId);
                break;
            case "checkout.session.async_payment_failed":
                const failedSession = event.data.object;
                console.log("Payment failed for session:", failedSession.id);
                // Handle failed payment (e.g., notify the user, retry payment, etc.)
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        res.status(200).send((0, successResponse_1.createSuccessResponse)("Webhook received", 200, {}));
    }
    catch (err) {
        res.status(400).send((0, failureResponse_1.createFailureResponse)(err.message, 400));
    }
});
exports.tenantControllers = {
    createRentalRequest,
    getAllRentalRequestsOfTenant,
    getSingleRentalRequestOfTenant,
    deleteRentalRequest,
    startPaymentSession,
    stripeWebhookController,
};
