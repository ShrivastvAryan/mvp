import mongoose, { Schema, Document, Model } from "mongoose";

/* 1️⃣ TypeScript Interface */
export interface IEvent extends Document {
  name: string;
  category: string;
  address: string;
  date: string;   // you can change this to Date if needed
  time: string;
  images: string[]; // array of image URLs
  createdAt: Date;
  updatedAt: Date;
}

/* 2️⃣ Schema */
const EventSchema: Schema<IEvent> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // store image URLs as strings
      default: [],
    },
    date: {
      type: String, // change to Date if storing real date object
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

/* 3️⃣ Prevent model overwrite in Next.js */
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;