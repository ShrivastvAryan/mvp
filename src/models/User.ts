// models/User.ts
import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "buyer" | "seller" ;

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide by default
    },

    role: {
      type: String,
      enum: ["buyer", "seller"]
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//
// 🔐 Hash password before save (NO next() needed)
//
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//
// 🔑 Compare password method
//
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

//
// Prevent model overwrite in Next.js (hot reload fix)
//
const Buyer: Model<IUser> =
  mongoose.models.Buyer || mongoose.model<IUser>("Buyer", UserSchema);

export default Buyer;
