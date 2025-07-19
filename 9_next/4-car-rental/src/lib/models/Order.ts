import mongoose, { Schema } from "mongoose";

export interface IOrder {
  _id: string;
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  price: number;
  currency: string;
  type: string;
  rental: {
    startDate: Date;
    endDate: Date;
    days: number;
    pickupLocation: string;
    dropoffLocation: string;
    notes?: string;
  };
  status: "pending" | "paid" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rental: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      days: {
        type: Number,
        required: true,
      },
      pickupLocation: {
        type: String,
        required: true,
      },
      dropoffLocation: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
