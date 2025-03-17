import { Request, Response } from "express";
import { IRental } from "./landlords.models";
import { landlordsServices } from "./landlords.services";
import { jwtDecode } from "jwt-decode";
import { createSuccessResponse } from "../../success-error_response/success-response/successResponse";
import { createFailureResponse } from "../../success-error_response/failure-response/failureResponse";
import { tokenDecoder } from "../../utils/token-decoder";

export interface CustomJwtPayload {
  id: string;
  role: string;
  email: string;
  profileImage: string;
}

const createRental = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const { id: landlordId, role } = jwtDecode<CustomJwtPayload>(token);
  const rental: IRental = req.body;
  if (role !== "landlord") {
    res
      .status(403)
      .json(
        createFailureResponse("Only landlords can create rental listings", 403)
      );
  }
  try {
    const createdRental = await landlordsServices.createRentalIntoDB(
      rental,
      landlordId
    );
    res
      .status(201)
      .json(createSuccessResponse("Rental created", 201, createdRental));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

const getAllRentalsBasedOnLandlordsId = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const { id: landlordId, role } = jwtDecode<CustomJwtPayload>(token);

  try {
    const rentals =
      await landlordsServices.getAllRentalsFromDbBasedOnLandlordsId(landlordId);

    res
      .status(200)
      .json(createSuccessResponse("Rentals retrieved", 200, rentals));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

const updateSpecificRental = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const rental = req.body;
  const rentalId = req.params.id;
  const { id: landlordId, role } = jwtDecode<CustomJwtPayload>(token);
  if (role !== "landlord") {
    res
      .status(403)
      .json(
        createFailureResponse("Only landlords can Update rental listings", 403)
      );
  }
  if (rental?.landlordID !== landlordId) {
    res
      .status(403)
      .json(createFailureResponse("You are not landlord for the rental.", 403));
  }
  try {
    const updatedRental =
      await landlordsServices.updateSpecificRentalListingIntoDB(
        rentalId,
        rental,
        landlordId
      );

    res
      .status(200)
      .json(
        createSuccessResponse(
          "Rental Updated Successfully!",
          200,
          updatedRental
        )
      );
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

const deleteSpecificRental = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const rentalId = req.params.id;
  const { id: landlordId, role } = jwtDecode<CustomJwtPayload>(token);
  if (role !== "landlord") {
    res
      .status(403)
      .json(
        createFailureResponse("Only landlords can Update rental listings", 403)
      );
  }

  try {
    const deletedRental = await landlordsServices.removeARentalListingFromDB(
      rentalId,
      landlordId
    );
    res
      .status(200)
      .json(
        createSuccessResponse(
          "Rental Deleted Successfully!",
          200,
          deletedRental
        )
      );
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

const getSpecificRental = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const rentalId = req.params.id;
  const { id: landlordId, role } = tokenDecoder(token, res);

  try {
    const rental = await landlordsServices.getSpecificRentalListingFromDB(
      rentalId,
      landlordId
    );
    res
      .status(200)
      .json(createSuccessResponse("Rental retrieved", 200, rental));
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

const getRentalRequests = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const { id: landlordId, role } = tokenDecoder(token, res);
  if (role !== "landlord") {
    res
      .status(403)
      .json(
        createFailureResponse("Only landlords can view rental requests", 403)
      );
  }
  try {
    const rentalRequests = await landlordsServices.getRentalRequestsFromDB(
      landlordId
    );
    res
      .status(200)
      .json(
        createSuccessResponse("Rental requests retrieved", 200, rentalRequests)
      );
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

const changeRentalRequestStatus = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  const rentalRequestId = req.params.id;
  const { id: landlordId, role } = tokenDecoder(token, res);
  const { status } = req.body;
  if (role !== "landlord") {
    res
      .status(403)
      .json(
        createFailureResponse(
          "Only landlords can approve or reject rental requests",
          403
        )
      );
  }
  try {
    const rentalRequest = await landlordsServices.changeRentalRequestStatusInDB(
      rentalRequestId,
      status,
      landlordId
    );
    res
      .status(200)
      .json(
        createSuccessResponse(
          "Rental request status updated",
          200,
          rentalRequest
        )
      );
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal server error", 500)
      );
  }
};

export const landlordsControllers = {
  createRental,
  getAllRentalsBasedOnLandlordsId,
  updateSpecificRental,
  deleteSpecificRental,
  getSpecificRental,
  getRentalRequests,
  changeRentalRequestStatus,
};
