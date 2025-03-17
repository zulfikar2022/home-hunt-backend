import Rental from "../users/landlord/landlords.models";

const getAllRentalsFromDB = async (
  page: number,
  limit: number,
  filters: { location?: string; rentAmount?: number; numberOfBedrooms?: number }
) => {
  const skip = (page - 1) * limit;

  // Construct query dynamically
  const query: any = {};
  if (filters.location) {
    query.location = { $regex: filters.location, $options: "i" };
  }
  if (filters.rentAmount !== undefined) {
    query.rentAmount = { $lte: filters.rentAmount };
  }
  if (filters.numberOfBedrooms !== undefined) {
    query.numberOfBedrooms = { $lte: filters.numberOfBedrooms };
  }

  try {
    // Get total matching documents count
    const totalItems = await Rental.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    // Fetch paginated results
    const rentals = await Rental.find(query).skip(skip).limit(limit);

    // Prepare response with metadata
    return {
      metadata: {
        currentPage: page,
        totalPages: totalPages,
        eachPageItem: rentals.length,
      },
      rentals,
    };
  } catch (error: any) {
    throw new Error(error.message || "Internal Server Error");
  }
};

const getRentalByIdFromDB = async (rentalId: string) => {
  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      throw new Error("Rental not found");
    }
    return rental;
  } catch (error: any) {
    throw new Error(error.message || "Internal Server Error");
  }
};

export const publicServices = {
  getAllRentalsFromDB,
  getRentalByIdFromDB,
};
