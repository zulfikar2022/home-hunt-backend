import { Request, Response } from "express";
import { createFailureResponse } from "../success-error_response/failure-response/failureResponse";
import { publicServices } from "./public.services";

const getRentals = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const { location, rentAmount, numberOfBedrooms } = req.query;

  try {
    const rentals = await publicServices.getAllRentalsFromDB(page, limit, {
      location: location as string,
      rentAmount:
        rentAmount === undefined || rentAmount === ""
          ? undefined
          : parseFloat(rentAmount as string),
      numberOfBedrooms:
        numberOfBedrooms === undefined || numberOfBedrooms === ""
          ? undefined
          : parseInt(numberOfBedrooms as string),
    });

    res.status(200).json({
      status: "success",
      data: rentals,
    });
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal Server Error", 500)
      );
  }
};

const getRentalById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rental = await publicServices.getRentalByIdFromDB(id);
    res.status(200).json({
      status: "success",
      data: rental,
    });
  } catch (error: any) {
    res
      .status(500)
      .json(
        createFailureResponse(error.message || "Internal Server Error", 500)
      );
  }
};

export const publicControllers = {
  getRentals,
  getRentalById,
};
