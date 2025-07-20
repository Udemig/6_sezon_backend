import React from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Car,
  CreditCard,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface OrderSuccessProps {
  searchParams: {
    orderId?: string;
  };
}

async function getOrderDetails(orderId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

const OrderSuccessPage: React.FC<OrderSuccessProps> = async ({
  searchParams,
}) => {
  const { orderId } = searchParams;

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the order information. Please check your email or
            contact support.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  const order = await getOrderDetails(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the order with ID: {orderId}
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price);
  };

  console.log(order.product);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-green-100 text-lg">
              Your car rental has been successfully booked
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h2>
                <p className="text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Car Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Vehicle Details
              </h3>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={order.product.images[0] || "/placeholder-car.jpg"}
                    alt={`${order.product.make} ${order.product.modelName}`}
                    width={200}
                    height={120}
                    className="w-full sm:w-48 h-32 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {order.product.make} {order.product.modelName}
                  </h4>
                  <p className="text-gray-600 mb-4">{order.product.year}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {order.product.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        ⚙️ {order.product.transmission}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        ⛽ {order.product.fuelType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        👥 {order.product.seats} seats
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Details */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Rental Details
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">Rental Period</h5>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-gray-600">
                        {formatDate(order.rental.startDate)} at{" "}
                        {formatTime(order.rental.startDate)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 hidden sm:block" />
                      <span className="text-gray-600">
                        {formatDate(order.rental.endDate)} at{" "}
                        {formatTime(order.rental.endDate)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {order.rental.days} day
                      {order.rental.days !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">
                      Pickup Location
                    </h5>
                    <p className="text-gray-600 mt-1">
                      {order.rental.pickupLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">
                      Dropoff Location
                    </h5>
                    <p className="text-gray-600 mt-1">
                      {order.rental.dropoffLocation}
                    </p>
                  </div>
                </div>

                {order.rental.notes && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">
                        Special Notes
                      </h5>
                      <p className="text-gray-600 mt-1">{order.rental.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg h-fit">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <CreditCard className="w-5 h-5" />
                <span>Payment Method: Card</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Base Rate ({order.rental.days} days)
                  </span>
                  <span className="text-gray-900">
                    {formatPrice(
                      order.product.pricePerDay * order.rental.days,
                      order.currency
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="text-gray-900">
                    {formatPrice(
                      order.price -
                        order.product.pricePerDay * order.rental.days,
                      order.currency
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(order.price, order.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bookings"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View All Bookings
          </Link>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Book Another Car
          </Link>
        </div>

        {/* Important Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-3">
            Important Information
          </h4>
          <ul className="space-y-2 text-blue-800">
            <li>
              • Please bring a valid driver's license and credit card for pickup
            </li>
            <li>• Arrive 15 minutes early for vehicle inspection</li>
            <li>• Check your email for detailed pickup instructions</li>
            <li>• 24/7 customer support: +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
