import Rental from "../landlord/landlords.models";
import RentalRequest from "./tenants.models";

const createRentalRequestIntoDB = async (
  tenantId: string,
  rentalId: string
) => {
  try {
    const rentalData = await Rental.findById(rentalId).populate("landlordID");
    if (!rentalData) {
      throw new Error("Rental not found.");
    }
    const landlordID = rentalData.landlordID._id;
    const requestWithSameRentalIdAndTenantId = await RentalRequest.find({
      tenantId,
      rentalId,
    });
    if (requestWithSameRentalIdAndTenantId.length > 0) {
      throw new Error("You have already requested for this rental.");
    }
    const rentalRequest = new RentalRequest({
      tenantId,
      rentalId,
      landlordID,
    });
    await rentalRequest.save();
    return rentalRequest;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllRentalRequestsOfTenantFromDB = async (tenantId: string) => {
  try {
    const rentalRequests = await RentalRequest.find({
      tenantId,
      isDeleted: false,
    }).populate("rentalId");
    return rentalRequests;
  } catch (error: any) {
    throw error;
  }
};

const getSingleRentalRequestOfTenantFromDB = async (
  rentalRequestId: string
) => {
  try {
    const rentalRequests = await RentalRequest.findById(rentalRequestId)
      .populate("rentalId")
      .populate("tenantId");
    if (!rentalRequests) {
      throw new Error("Rental Request not found.");
    }
    return rentalRequests;
  } catch (error: any) {
    throw error;
  }
};

const deleteRentalRequestFromDB = async (rentalRequestId: string) => {
  try {
    const rentalRequest = await RentalRequest.findByIdAndDelete(
      rentalRequestId
    );
    if (!rentalRequest) {
      throw new Error("Rental Request not found.");
    }
    return rentalRequest;
  } catch (error: any) {
    throw error;
  }
};

const updatePaymentStatusInRentalRequest = async (rentalRequestId: string) => {
  try {
    const rentalRequest = await RentalRequest.findById(rentalRequestId);
    if (!rentalRequest) {
      throw new Error("Rental Request not found.");
    }
    rentalRequest.isPaid = true;
    await rentalRequest.save();
    return rentalRequest;
  } catch (error: any) {
    throw error;
  }
};

export const tenantsServices = {
  createRentalRequestIntoDB,
  getAllRentalRequestsOfTenantFromDB,
  getSingleRentalRequestOfTenantFromDB,
  deleteRentalRequestFromDB,
  updatePaymentStatusInRentalRequest,
};
