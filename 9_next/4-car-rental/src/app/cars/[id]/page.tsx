"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Heart,
  Star,
  Fuel,
  Settings,
  Users,
  MapPin,
  Shield,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import ReviewSection from "@/components/ReviewSection";
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
  licensePlate: string;
}

interface Review {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/cars/${carId}`);
        if (!response.ok) {
          throw new Error("Car not found");
        }
        const data = await response.json();
        setCar(data.car);
        setReviews(data.reviews || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load car details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Add to favorites API call
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading car details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-600">{error || "Car not found"}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const carName = `${car.make} ${car.modelName}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Images */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400">
                    Car Image {selectedImageIndex + 1}
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index - 1)}
                      className={`w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center ${
                        selectedImageIndex === index - 1
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <div className="text-xs text-gray-400">{index}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {carName}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {car.type} • {car.year}
                  </p>
                </div>
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full ${
                    isFavorite ? "text-red-500" : "text-gray-400"
                  } hover:text-red-500 transition-colors`}
                >
                  <Heart
                    className="h-6 w-6"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Rating and Location */}
              <div className="flex items-center gap-6 mb-6">
                {car.averageRating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">
                      {car.averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-600">
                      ({car.totalReviews} reviews)
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{car.location}</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Fuel className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-semibold capitalize">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-semibold capitalize">
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-semibold">{car.seats} People</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-semibold">
                      {car.mileage.toLocaleString()} miles
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews */}
            <ReviewSection reviews={reviews} carId={carId} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm car={car} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
