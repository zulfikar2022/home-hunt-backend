import mongoose, { Schema, Document } from "mongoose";

export interface IRental extends Document {
  location: string;
  description: string;
  rentAmount: number;
  numberOfBedrooms: number;
  landlordID: mongoose.Types.ObjectId;
  isDeleted: boolean;
  images?: string[];
  amenities?: string[];
}

const RentalSchema: Schema = new Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  numberOfBedrooms: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  landlordID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  images: { type: [String], required: false },
  amenities: { type: [String], required: false },
});

const Rental = mongoose.model<IRental>("Rental", RentalSchema);

export default Rental;
