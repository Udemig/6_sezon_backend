import mongoose from "mongoose";
import { ICar } from "@/types";

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    modelName: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1990,
      max: new Date().getFullYear() + 1,
    },
    type: {
      type: String,
      required: true,
      enum: ["sedan", "suv", "hatchback", "sports", "luxury"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["manual", "automatic"],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["gasoline", "diesel", "hybrid", "electric"],
    },
    seats: {
      type: Number,
      required: true,
      min: 2,
      max: 8,
    },
    doors: {
      type: Number,
      required: true,
      min: 2,
      max: 5,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.models.Car || mongoose.model<ICar>("Car", carSchema);

export default Car;
