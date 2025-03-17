import { NextFunction, Request, Response, Router } from "express";
import { landlordsControllers } from "./landlords.controllers";
import { isLoggedIn } from "../../utils/isLoggedIn/isLoggedIn";
import { rentalValidations } from "./landlords.verification";

const landlordRoutes = Router();

// create a new rental house listing
landlordRoutes.post(
  "/listings",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      rentalValidations.rentalVerificationSchema.parse(req.body);
      next();
    } catch (error: any) {
      next(error);
    }
  },
  landlordsControllers.createRental
);

// retrieve all rental house listings of specific landlord
landlordRoutes.get(
  "/listings",
  isLoggedIn,
  landlordsControllers.getAllRentalsBasedOnLandlordsId
);

// retrieve a specific rental house listing based on the _id
landlordRoutes.get(
  "/listings/:id",
  isLoggedIn,
  landlordsControllers.getSpecificRental
);

// update a specific rental house listing
landlordRoutes.put(
  "/listings/:id",
  isLoggedIn,
  landlordsControllers.updateSpecificRental
);

// remove a rental listing
landlordRoutes.delete(
  "/listings/:id",
  isLoggedIn,
  landlordsControllers.deleteSpecificRental
);

// retrieve all rental requests for the listings posted by the landlord
landlordRoutes.get(
  "/requests",
  isLoggedIn,
  landlordsControllers.getRentalRequests
);

// approve or reject a rental request
landlordRoutes.put(
  "/requests/:id",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      rentalValidations.rentalResponseSchema.parse(req.body);
      next();
    } catch (error: any) {
      next(error);
    }
  },
  landlordsControllers.changeRentalRequestStatus
);

export default landlordRoutes;
