import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { envVars } from "../configuration/env.config";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  isDeactivated: boolean;
  isDeleted: boolean;
  profileImage: string;
  role: "admin" | "landlord" | "tenant";
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isVerified: { type: Boolean, default: true },
  isDeactivated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  profileImage: { type: String, default: "" },
  role: { type: String, enum: ["admin", "landlord", "tenant"], required: true },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(
    parseInt(envVars.PASSWORD_HASHING_SALT as string)
  );
  const pass = this.password;
  this.password = await bcrypt.hash(pass, salt);
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
