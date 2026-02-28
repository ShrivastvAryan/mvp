// models/Product.ts
import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  name: string;
  category: string;
  mrp: string;
  price: string;
  stock: string;
  images: string[];
  description: string;
  seller: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ['wooden', 'textile', 'pottery', 'home-decor'],
      required: true,
    },

    mrp: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    stock: {
      type: String,
      required: true,
    },
    images: {
    type: [String],
    required: true,
    },
    description: {
      type: String,
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
