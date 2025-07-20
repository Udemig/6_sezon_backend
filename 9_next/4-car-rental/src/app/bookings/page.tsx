import { getCurrentUser } from "@/lib/auth-utils";
import { getOrders } from "@/lib/services/order.service";
import { Order } from "@/types";
import { Calendar, MapPin, CreditCard, Clock, Car } from "lucide-react";
import { generateCarImageUrl } from "@/lib/utils";
import Link from "next/link";

const BookingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            My Orders
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to view your orders.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  let orders: Order[] = [];
  let loading = false;
  let error = null;

  try {
    const res = await getOrders(user.id);
    orders = res.orders;
  } catch (err) {
    error = "Failed to load orders";
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your car rental orders</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {orders?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Car className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't made any car rental orders yet.
          </p>
          <Link
            href="/cars"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Car Image */}
                <div className="w-full lg:w-64 h-48 lg:h-40">
                  <img
                    src={generateCarImageUrl(order.product, "05")}
                    alt={`${order.product.make} ${order.product.modelName}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {order.product.make} {order.product.modelName}
                      </h3>
                      <p className="text-gray-500">
                        {order.product.type} • {order.product.year}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Rental Period</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(order.rental.startDate)} -{" "}
                          {formatDate(order.rental.endDate)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.rental.days} days
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Pickup Location</p>
                        <p className="font-medium text-gray-900">
                          {order.rental.pickupLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="font-semibold text-gray-900 text-lg">
                          {formatPrice(order.price, order.currency)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.rental.dropoffLocation &&
                    order.rental.dropoffLocation !==
                      order.rental.pickupLocation && (
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Dropoff Location
                          </p>
                          <p className="font-medium text-gray-900">
                            {order.rental.dropoffLocation}
                          </p>
                        </div>
                      </div>
                    )}

                  {order.rental.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Notes</p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {order.rental.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Link
                      href={`/cars/${order.product._id}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Car Details
                    </Link>
                    {order.status.toLowerCase() === "completed" && (
                      <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
