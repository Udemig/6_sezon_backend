import { model, Schema } from "mongoose";
import type { ICourier, IDeliveryTracking } from "./types/index.ts";

// location schema
const locationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longtitude: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

// schema
const courierSchema = new Schema<ICourier>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleType: { type: String, required: true, enum: ["motorcycle", "bicycle", "car"] },
    vehiclePlate: { type: String },
    isAvailable: { type: Boolean, default: true },
    role: { type: String, required: true, enum: ["courier", "admin"] },
    status: { type: String, required: true, enum: ["available", "busy", "offline"] },
    location: [locationSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc: any, ret: any) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// delivery tracking schema
const deliveryTrackingSchema = new Schema<IDeliveryTracking>(
  {
    orderId: { type: String, required: true },
    courierId: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["pending", "ready", "assigned", "picked_up", "in_transit", "delivered", "failed"],
      default: "pending",
    },
    location: [locationSchema],
    estimatedDeliveryTime: { type: Date },
    actualDeliveryTime: { type: Date },
    notes: { type: String },
    acceptedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// model
const Courier = model("Courier", courierSchema);
const DeliveryTracking = model("DeliveryTracking", deliveryTrackingSchema);
export { Courier, DeliveryTracking };
