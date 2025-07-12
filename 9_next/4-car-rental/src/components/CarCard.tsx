"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Fuel, Settings, Users, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Car {
  _id: string;
  make: string;
  modelName: string;
  year: number;
  type: string;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  pricePerDay: number;
  images: string[];
  description: string;
  features: string[];
  location: string;
  averageRating: number;
  totalReviews: number;
  mileage: number;
  color: string;
}

interface CarCardProps {
  car: Car;
  viewMode: "grid" | "list";
}

export default function CarCard({ car, viewMode }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Add to favorites API call
  };

  const carName = `${car.make} ${car.modelName}`;

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex gap-6">
          {/* Car Image */}
          <div className="w-48 h-32 flex-shrink-0">
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-sm">Car Image</div>
            </div>
          </div>

          {/* Car Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {carName}
                </h3>
                <p className="text-sm text-gray-500">
                  {car.type} • {car.year}
                </p>
              </div>
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                } hover:text-red-500 transition-colors`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {car.averageRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {car.averageRating.toFixed(1)} ({car.totalReviews})
                  </span>
                </div>
              )}
              <span className="text-sm text-gray-600">{car.location}</span>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {car.transmission}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{car.seats} seats</span>
              </div>
              <div className="text-sm text-gray-600">
                {car.mileage.toLocaleString()} miles
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {car.description}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(car.pricePerDay)}
                </span>
                <span className="text-sm text-gray-500">/day</span>
              </div>
              <Link
                href={`/cars/${car._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{carName}</h3>
          <p className="text-sm text-gray-500">{car.type}</p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full ${
            isFavorite ? "text-red-500" : "text-gray-400"
          } hover:text-red-500 transition-colors`}
        >
          <Heart
            className="h-5 w-5"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Car Image */}
      <div className="mb-6">
        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-400 text-sm">Car Image</div>
        </div>
      </div>

      {/* Rating and Location */}
      <div className="flex items-center justify-between mb-4">
        {car.averageRating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {car.averageRating.toFixed(1)} ({car.totalReviews})
            </span>
          </div>
        )}
        <span className="text-sm text-gray-600">{car.location}</span>
      </div>

      {/* Car Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Fuel className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">{car.fuelType}</span>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">{car.transmission}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">{car.seats} seats</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(car.pricePerDay)}
          </span>
          <span className="text-sm text-gray-500">/day</span>
        </div>
        <Link
          href={`/cars/${car._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Rent Now
        </Link>
      </div>
    </div>
  );
}
