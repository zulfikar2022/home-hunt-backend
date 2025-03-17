import express, { Request, Response } from "express";
import cors from "cors";

import router from "./routes";
import { createFailureResponse } from "./success-error_response/failure-response/failureResponse";
import { tenantControllers } from "./users/tenant/tenants.controllers";
import bodyParser from "body-parser";

export const app = express();

app.use(cors());

app.post(
  "/webhook",
  // bodyParser.raw({ type: "application/json" }),
  express.raw({ type: "application/json" }),
  tenantControllers.stripeWebhookController
);

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send(createFailureResponse(err.message, 500, err));
});
