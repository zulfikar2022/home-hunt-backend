import { Schema, model, Document } from "mongoose";

interface IRentalRequest extends Document {
  tenantId: Schema.Types.ObjectId;
  rentalId: Schema.Types.ObjectId;
  isDeleted: boolean;
  status: "pending" | "approved" | "rejected";
  isPaid: boolean;
  landlordID: Schema.Types.ObjectId;
}

const rentalRequestSchema = new Schema<IRentalRequest>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rentalId: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
    landlordID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const RentalRequest = model<IRentalRequest>(
  "RentalRequest",
  rentalRequestSchema
);

export default RentalRequest;
