"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  CreditCard,
  Lock,
  ArrowLeft,
  Calendar,
  MapPin,
  Car,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice, formatDate } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Booking {
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

function PaymentForm({ booking }: { booking: Booking }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/payment/create-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: booking._id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment intent");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize payment"
        );
      }
    };

    createPaymentIntent();
  }, [booking._id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setError(null);

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user ? `${user.firstName} ${user.lastName}` : "Guest",
          email: user?.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      toast.error(result.error.message || "Payment failed");
    } else {
      // Payment succeeded
      toast.success("Payment successful!");
      router.push(`/booking/success/${booking._id}`);
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>

          <div className="space-y-4">
            {/* Car Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {booking.carId.make} {booking.carId.modelName}
                </h3>
                <p className="text-sm text-gray-600">
                  Car ID: {booking.carId._id}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">
                  {formatDate(new Date(booking.startDate))} -{" "}
                  {formatDate(new Date(booking.endDate))}
                </p>
                <p className="text-sm text-gray-600">Rental Period</p>
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">
                    Pickup: {booking.pickupLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">
                    Drop-off: {booking.dropoffLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {booking.notes && (
              <div>
                <p className="font-medium mb-1">Notes:</p>
                <p className="text-sm text-gray-600">{booking.notes}</p>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">Secure Payment</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Card Information
              </label>
              <div className="border border-gray-300 rounded-lg p-4 bg-white">
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading || !clientSecret}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Pay {formatPrice(booking.totalPrice)}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error("Booking not found");
        }
        const data = await response.json();
        setBooking(data.booking);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading booking details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-600">{error || "Booking not found"}</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Booking
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 mt-2">
            Review your booking details and complete the payment to confirm your
            reservation.
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm booking={booking} />
        </Elements>
      </div>

      <Footer />
    </div>
  );
}
