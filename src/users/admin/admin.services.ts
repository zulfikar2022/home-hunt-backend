// Assuming you have a User model

import Rental from "../landlord/landlords.models";
import User from "../users.models";

const getAllUsersFromDb = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / limit);
  const users = await User.find({ isDeleted: false }).skip(skip).limit(limit);

  return {
    users,
    metadata: {
      currentPage: page,
      totalPages,
      eachPageItem: limit,
    },
  };
};

const deactivateUserIntoDB = async (userId: string) => {
  try {
    const user = await User.findById(userId, { isDeactivated: false });
    if (!user) {
      throw new Error("User not found");
    }
    user.isDeactivated = true;
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const getAllRentalHouseListingsFromDB = async (
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const totalRentals = await Rental.countDocuments();
  const totalPages = Math.ceil(totalRentals / limit);
  try {
    const rentals = await Rental.find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .populate("landlordID");

    return {
      rentals,
      metadata: {
        currentPage: page,
        totalPages,
        eachPageItem: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

const deleteARentalHouseListingFromDB = async (rentalId: string) => {
  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      throw new Error("Rental not found");
    }
    if (rental.isDeleted) {
      throw new Error("Rental already deleted");
    }
    rental.isDeleted = true;
    await rental.save();
    return rental;
  } catch (error: any) {
    throw error;
  }
};

const deleteAUserFromDB = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === "admin") {
      throw new Error("Cannot delete an admin");
    }
    user.isDeleted = true;
    await user.save();
    return user;
  } catch (error: any) {
    throw error;
  }
};

const changeUserActiveStatusIntoDB = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === "admin") {
      throw new Error("Cannot change an admin's active status");
    }
    user.isDeactivated = !user.isDeactivated;
    user.save();
    return user;
  } catch (error: any) {
    throw error;
  }
};

export const adminServices = {
  getAllUsersFromDb,
  deactivateUserIntoDB,
  getAllRentalHouseListingsFromDB,
  deleteARentalHouseListingFromDB,
  deleteAUserFromDB,
  changeUserActiveStatusIntoDB,
};
