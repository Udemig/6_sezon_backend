import { Document, Types } from "mongoose";

import type { NextFunction, Request, Response } from "express";

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

// Restaurant Types
export interface IOpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface IRestaurant extends Document {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  categories: string[];
  deliveryTime: number;
  minOrder: number;
  deliveryFee: number;
  rating: number;
  isActive: boolean;
  isOpen: boolean;
  openingHours: IOpeningHours;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMenuItem extends Document {
  restaurantId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  ingredients: string[];
  allergens: string[];
  isVegetarian: boolean;
  isAvailable: boolean;
  preparationTime: number;
  createdAt: Date;
  updatedAt: Date;
}
