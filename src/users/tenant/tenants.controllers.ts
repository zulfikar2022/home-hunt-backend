import { Request, Response } from "express";
import { tokenDecoder } from "../../utils/token-decoder";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";
import { tenantsServices } from "./tenants.services";
import { createSuccessResponse } from "../../success-error_response/success-response/successResponse";
import { envVars } from "../../configuration/env.config";
import Stripe from "stripe";

const createRentalRequest = async (req: Request, res: Response) => {
  const token = req?.headers?.authorization;
  const rentalId = req?.body?.rentalId;
  if (!rentalId) {
    res.status(401).json(createFailureResponse("No rentalId provided.", 401));
  }

  const decodedData = tokenDecoder(token!, res);

  const { role, id } = decodedData;

  if (role !== "tenant") {
    res
      .status(401)
      .json(createFailureResponse("Only tenant can request for rental.", 401));
  }

  try {
    const rentalRequest = await tenantsServices.createRentalRequestIntoDB(
      id,
      rentalId
    );

    res
      .status(201)
      .json(
        createSuccessResponse(
          "Rental Request created Successfully!",
          201,
          rentalRequest
        )
      );
  } catch (error: any) {
    res.status(500).json(createFailureResponse(error.message, 500));
  }
};

const getAllRentalRequestsOfTenant = async (req: Request, res: Response) => {
  const token = req?.headers?.authorization;
  const decodedData = tokenDecoder(token!, res);
  const { id } = decodedData;
  try {
    const rentalRequests =
      await tenantsServices.getAllRentalRequestsOfTenantFromDB(id);
    res
      .status(200)
      .json(
        createSuccessResponse(
          "All rental requests fetched successfully!",
          200,
          rentalRequests
        )
      );
  } catch (error: any) {
    res.status(500).json(createFailureResponse(error.message, 500));
  }
};

const getSingleRentalRequestOfTenant = async (req: Request, res: Response) => {
  const rentalRequestId = req.params.id;

  try {
    const rentalRequest =
      await tenantsServices.getSingleRentalRequestOfTenantFromDB(
        rentalRequestId
      );
    res
      .status(200)
      .json(
        createSuccessResponse(
          "Rental request fetched successfully!",
          200,
          rentalRequest
        )
      );
  } catch (error: any) {
    res.status(500).json(createFailureResponse(error.message, 500));
  }
};

const deleteRentalRequest = async (req: Request, res: Response) => {
  const rentalRequestId = req.params.id;
  const token = req?.headers?.authorization;
  const decodedData = tokenDecoder(token!, res);
  const { role } = decodedData;
  if (role !== "tenant") {
    res
      .status(401)
      .json(
        createFailureResponse("Only tenant can delete rental request.", 401)
      );
  }

  try {
    const rentalRequest = await tenantsServices.deleteRentalRequestFromDB(
      rentalRequestId
    );
    res
      .status(200)
      .json(
        createSuccessResponse(
          "Rental request deleted successfully!",
          200,
          rentalRequest
        )
      );
  } catch (error: any) {
    res.status(500).json(createFailureResponse(error.message, 500));
  }
};
const startPaymentSession = async (req: Request, res: Response) => {
  try {
    const { rentalRequestId, price } = req.body;

    const stripe = new Stripe(envVars.STRIPE_SECRET_KEY as string, {
      apiVersion: "2025-02-24.acacia",
    });

    const stripeObjectToPayment = {
      payment_method_types: [
        "card",
      ] as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
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
      mode: "payment" as const,
      success_url: envVars.PAYMENT_SUCCESS_URL,
      cancel_url: envVars.PAYMENT_FAILURE_URL,
    };

    const session = await stripe.checkout.sessions.create(
      stripeObjectToPayment
    );

    res
      .status(200)
      .json(createSuccessResponse("Payment session started", 200, session));
  } catch (error: any) {
    res.status(500).json(createFailureResponse(error.message, 500));
  }
};

const stripeWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  const stripe = new Stripe(envVars.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia",
  });
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      envVars.STRIPE_ENDPOINT_SECRET!
    );

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment was successful for session:", session.id);
        // Handle successful payment (e.g., update database, send confirmation email)
        const rentalRequestId = session.metadata?.rentalRequestId;
        console.log("Rental Request ID:", rentalRequestId);
        tenantsServices.updatePaymentStatusInRentalRequest(rentalRequestId!);
        break;

      case "checkout.session.async_payment_failed":
        const failedSession = event.data.object as Stripe.Checkout.Session;
        console.log("Payment failed for session:", failedSession.id);
        // Handle failed payment (e.g., notify the user, retry payment, etc.)
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.status(200).send(createSuccessResponse("Webhook received", 200, {}));
  } catch (err: any) {
    res.status(400).send(createFailureResponse(err.message, 400));
  }
};
export const tenantControllers = {
  createRentalRequest,
  getAllRentalRequestsOfTenant,
  getSingleRentalRequestOfTenant,
  deleteRentalRequest,
  startPaymentSession,
  stripeWebhookController,
};
