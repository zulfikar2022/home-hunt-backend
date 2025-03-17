import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import { createSuccessResponse } from "../../success-error_response/success-response/successResponse";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";
import { tokenDecoder } from "../../utils/token-decoder";

const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const users = await adminServices.getAllUsersFromDb(page, limit);

    res.status(200).json(createSuccessResponse("Users retrieved", 200, users));
  } catch (error) {
    res.status(500).json(createFailureResponse("Internal server error", 500));
  }
};

const deactivateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await adminServices.deactivateUserIntoDB(id);
    res.status(200).json(createSuccessResponse("User deleted", 200, user));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal Server Error", 500)
      );
  }
};

const getAllRentalHouseListings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const rentals = await adminServices.getAllRentalHouseListingsFromDB(
      page,
      limit
    );

    res
      .status(200)
      .json(createSuccessResponse("Rentals retrieved", 200, rentals));
  } catch (error) {
    res.status(500).json(createFailureResponse("Internal server error", 500));
  }
};

const deleteARentalHouseListing = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rental = await adminServices.deleteARentalHouseListingFromDB(id);
    res.status(200).json(createSuccessResponse("Rental deleted", 200, rental));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal Server Error", 500)
      );
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await adminServices.deleteAUserFromDB(id);
    res.status(200).json(createSuccessResponse("User deleted", 200, user));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal Server Error", 500)
      );
  }
};

const changeUsersActiveStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await adminServices.changeUserActiveStatusIntoDB(id);
    res
      .status(200)
      .json(createSuccessResponse("User status changed", 200, user));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

export const adminControllers = {
  getUsers,
  deactivateUser,
  getAllRentalHouseListings,
  deleteARentalHouseListing,
  deleteAUser,
  changeUsersActiveStatus,
};
