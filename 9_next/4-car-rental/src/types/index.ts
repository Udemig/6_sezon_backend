import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// ===== ENUMS AND UNION TYPES =====

export type CarType = "sedan" | "suv" | "hatchback" | "sports" | "luxury";
export type TransmissionType = "manual" | "automatic";
export type FuelType = "gasoline" | "diesel" | "hybrid" | "electric";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

// ===== DATABASE MODEL INTERFACES =====

export interface ICar extends mongoose.Document {
  make: string;
  modelName: string;
  year: number;
  type: CarType;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  doors: number;
  pricePerDay: number;
  images: string[];
  description: string;
  features: string[];
  location: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  mileage: number;
  color: string;
  licensePlate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: BookingStatus;
  paymentIntentId?: string;
  stripeSessionId?: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  isApproved: boolean;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===== API RESPONSE TYPES =====

export interface Car {
  _id: string;
  make: string;
  modelName: string;
  year: number;
  type: CarType;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  doors: number;
  pricePerDay: number;
  images: string[];
  description: string;
  features: string[];
  location: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  mileage: number;
  color: string;
  licensePlate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarsResponse {
  cars: Car[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalCars: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalCars: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ===== AUTH TYPES =====

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthUser;
}

// ===== COMPONENT TYPES =====

export interface FilterState {
  type: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  transmission: string;
  fuelType: string;
  seats: string;
}

export interface CarFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export interface Review {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewSectionProps {
  reviews: Review[];
  carId: string;
}

export interface CarCardProps {
  car: Car;
  viewMode?: "grid" | "list";
}

export interface CarImageGalleryProps {
  car: Car;
}

export interface BookingFormProps {
  car: Car;
}

// ===== PAGE SPECIFIC TYPES =====

export interface Booking {
  _id: string;
  carId: {
    _id: string;
    make: string;
    modelName: string;
    images: string[];
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  notes?: string;
}

// ===== API ROUTE TYPES =====

export interface RouteParams {
  params: {
    id: string;
  };
}

// ===== FORM TYPES =====

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface BookingFormData {
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}

// ===== SEARCH AND FILTER TYPES =====

export interface SearchParams {
  search?: string;
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  fuelType?: string;
  seats?: number;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// NextAuth type extensions
declare module "next-auth" {
  interface User extends DefaultUser {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isEmailVerified: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isEmailVerified: boolean;
  }
}

// Checkout Types
export interface CheckoutBody {
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string;
}

export interface Order {
  _id: string;
  product: Car;
  user: string;
  price: number;
  currency: string;
  type: string;
  rental: {
    startDate: string;
    endDate: string;
    days: number;
    pickupLocation: string;
    dropoffLocation: string;
    notes?: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}
