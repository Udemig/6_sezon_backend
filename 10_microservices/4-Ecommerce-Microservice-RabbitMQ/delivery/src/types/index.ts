import type { NextFunction, Request, Response } from "express";
import type { Document, Types } from "mongoose";

export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type UserRole = "customer" | "restaurant_owner" | "courier" | "admin";

export interface IAddress {
  _id?: string;
  title: string;
  address: string;
  city: string;
  district: string;
  postalCode: number;
  isDefault: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  addresses: IAddress[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

export interface IJwtPayload {
  userId: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Teslimat
export type DeliveryStatus = "assigned" | "picked_up" | "in_transit" | "delivered" | "failed";

export interface ILocation {
  latitude: number;
  longtitude: number;
}

export interface IDeliveryTracking extends Document {
  orderId: Types.ObjectId | string;
  courierId: Types.ObjectId | string;
  status: DeliveryStatus | "pending" | "ready";
  location?: ILocation;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  notes?: string;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Kurye
export type CourierStatus = "available" | "busy" | "offline";

export interface ICourier extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  vehicleType: "motorcycle" | "bicycle" | "car";
  vehiclePlate?: string;
  status: CourierStatus;
  isAvailable: boolean;
  role: "courier" | "admin";
  location?: ILocation[];
  createdAt: Date;
  updatedAt: Date;
}
