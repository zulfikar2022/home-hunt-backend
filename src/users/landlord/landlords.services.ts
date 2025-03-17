import RentalRequest from "../tenant/tenants.models";
import User from "../users.models";
import Rental, { IRental } from "./landlords.models";

const createRentalIntoDB = async (rental: IRental, landlordId: string) => {
  try {
    const landlord = await User.findById(landlordId);
    if (!landlord) {
      throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
      throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
      throw new Error("Landlord is deactivated");
    }

    const newHouseListing = new Rental({
      ...rental,
      landlordID: landlordId,
    });
    const createdRental = await newHouseListing.save();
    return createdRental;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllRentalsFromDbBasedOnLandlordsId = async (landlordId: string) => {
  try {
    const landlord = await User.findById(landlordId);
    if (!landlord) {
      throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
      throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
      throw new Error("Landlord is deactivated");
    }

    const rentals = await Rental.find({
      landlordID: landlordId,
      isDeleted: false,
    });

    return rentals;
  } catch (error: any) {
    throw error;
  }
};

const getSpecificRentalListingFromDB = async (
  rentalId: string,
  landlordId: string
) => {
  try {
    const landlord = await User.findById(landlordId);
    if (!landlord) {
      throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
      throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
      throw new Error("Landlord is deactivated");
    }
    const rental = await Rental.findById(rentalId).populate("landlordID");
    if (!rental) {
      throw new Error("Rental not found");
    }

    return rental;
  } catch (error: any) {
    throw error;
  }
};

const updateSpecificRentalListingIntoDB = async (
  rentalId: string,
  rental: IRental,
  landlordId: string
) => {
  try {
    const landlord = await User.findById(landlordId);
    if (!landlord) {
      throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
      throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
      throw new Error("Landlord is deactivated");
    }
    const updatedRental = await Rental.findByIdAndUpdate(rentalId, rental, {
      new: true,
    });
    return updatedRental;
  } catch (error: any) {
    throw error;
  }
};

const removeARentalListingFromDB = async (
  rentalId: string,
  landlordId: string
) => {
  try {
    const landlord = await User.findById(landlordId);
    if (!landlord) {
      throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
      throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
      throw new Error("Landlord is deactivated");
    }
    const rental = await Rental.findById(rentalId);

    if (!rental) {
      throw new Error("Rental not found");
    }
    if (rental.isDeleted) {
      throw new Error("Rental already deleted");
    }
    if ((rental?.landlordID).toString() !== landlordId) {
      throw new Error("This is not your rental!");
    }
    rental.isDeleted = true;
    await rental.save();
    return rental;
  } catch (error) {
    throw error;
  }
};

const getRentalRequestsFromDB = async (landlordId: string) => {
  try {
    const landlord = await User.findById(landlordId);
    if (!landlord) {
      throw new Error("Landlord not found");
    }
    if (landlord.isDeleted) {
      throw new Error("Landlord is deleted");
    }
    if (landlord.isDeactivated) {
      throw new Error("Landlord is deactivated");
    }
    const rentalRequests = await RentalRequest.find({
      landlordID: landlordId,
      status: "pending",
    }).populate("tenantId rentalId landlordID");
    return rentalRequests;
  } catch (error: any) {
    throw error;
  }
};

const changeRentalRequestStatusInDB = async (
  rentalRequestId: string,
  status: "approved" | "rejected",
  landlordId: string
) => {
  const landlord = await User.findById(landlordId);
  if (!landlord) {
    throw new Error("Landlord not found");
  }
  if (landlord.isDeleted) {
    throw new Error("Landlord is deleted");
  }
  if (landlord.isDeactivated) {
    throw new Error("Landlord is deactivated");
  }
  if (status !== "approved" && status !== "rejected") {
    throw new Error("Invalid status");
  }
  try {
    const rentalRequest = await RentalRequest.findById(rentalRequestId);
    if (!rentalRequest) {
      throw new Error("Rental request not found");
    }
    if (rentalRequest.status === "rejected") {
      throw new Error("Rental request already rejected");
    }

    rentalRequest.status = status;
    await rentalRequest.save();
    return rentalRequest;
  } catch (error) {
    throw error;
  }
};

export const landlordsServices = {
  createRentalIntoDB,
  getAllRentalsFromDbBasedOnLandlordsId,
  updateSpecificRentalListingIntoDB,
  removeARentalListingFromDB,
  getSpecificRentalListingFromDB,
  getRentalRequestsFromDB,
  changeRentalRequestStatusInDB,
};
