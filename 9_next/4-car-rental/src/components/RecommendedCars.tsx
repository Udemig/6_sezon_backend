"use client";

import { Heart, Fuel, Settings, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  fuelCapacity: string;
  transmission: string;
  capacity: string;
  price: number;
  originalPrice?: number;
  isFavorite?: boolean;
}

// Sample data - will be replaced with real API data
const recommendedCars: Car[] = [
  {
    id: "5",
    name: "All New Rush",
    type: "SUV",
    image: "/api/placeholder/300/200",
    fuelCapacity: "70L",
    transmission: "Manual",
    capacity: "6 People",
    price: 72.0,
    originalPrice: 80.0,
  },
  {
    id: "6",
    name: "CR  - V",
    type: "SUV",
    image: "/api/placeholder/300/200",
    fuelCapacity: "80L",
    transmission: "Manual",
    capacity: "6 People",
    price: 80.0,
    isFavorite: true,
  },
  {
    id: "7",
    name: "All New Terios",
    type: "SUV",
    image: "/api/placeholder/300/200",
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "6 People",
    price: 74.0,
  },
  {
    id: "8",
    name: "CR  - V",
    type: "SUV",
    image: "/api/placeholder/300/200",
    fuelCapacity: "80L",
    transmission: "Manual",
    capacity: "6 People",
    price: 80.0,
    isFavorite: true,
  },
  {
    id: "9",
    name: "MG ZX Exclusice",
    type: "Hatchback",
    image: "/api/placeholder/300/200",
    fuelCapacity: "70L",
    transmission: "Manual",
    capacity: "4 People",
    price: 76.0,
    originalPrice: 80.0,
    isFavorite: true,
  },
  {
    id: "10",
    name: "New MG ZS",
    type: "SUV",
    image: "/api/placeholder/300/200",
    fuelCapacity: "80L",
    transmission: "Manual",
    capacity: "6 People",
    price: 80.0,
  },
  {
    id: "11",
    name: "MG ZX Excite",
    type: "Hatchback",
    image: "/api/placeholder/300/200",
    fuelCapacity: "90L",
    transmission: "Manual",
    capacity: "4 People",
    price: 74.0,
    isFavorite: true,
  },
  {
    id: "12",
    name: "New MG ZS",
    type: "SUV",
    image: "/api/placeholder/300/200",
    fuelCapacity: "80L",
    transmission: "Manual",
    capacity: "6 People",
    price: 80.0,
  },
];

export default function RecommendedCars() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (carId: string) => {
    setFavorites((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recommendation Car
        </h2>
        <Link href="/cars" className="text-blue-500 hover:text-blue-600">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedCars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-500">{car.type}</p>
              </div>
              <button
                onClick={() => toggleFavorite(car.id)}
                className={`p-2 rounded-full ${
                  favorites.includes(car.id) || car.isFavorite
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={
                    favorites.includes(car.id) || car.isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            {/* Car Image */}
            <div className="mb-6">
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-sm">Car Image</div>
              </div>
            </div>

            {/* Car Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Fuel className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {car.fuelCapacity}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {car.transmission}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{car.capacity}</span>
              </div>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ${car.price.toFixed(2)}/
                </span>
                <span className="text-sm text-gray-500">day</span>
                {car.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    ${car.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>
              <Link
                href={`/cars/${car.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Rent Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Cars Button */}
      <div className="text-center mt-8">
        <Link
          href="/cars"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block transition-colors"
        >
          Show more car
        </Link>
      </div>
    </section>
  );
}
