import React from "react";
import {
  XCircle,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Car,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface CancelPageProps {
  searchParams: {
    sessionId?: string;
    orderId?: string;
    reason?: string;
  };
}

const CancelPage: React.FC<CancelPageProps> = async ({ searchParams }) => {
  const { sessionId, orderId, reason } = searchParams;

  const getCancelReason = (reason?: string) => {
    switch (reason) {
      case "payment_failed":
        return "Payment processing failed";
      case "user_cancelled":
        return "Payment was cancelled by user";
      case "session_expired":
        return "Payment session expired";
      case "insufficient_funds":
        return "Insufficient funds";
      default:
        return "Payment was not completed";
    }
  };

  const getHelpMessage = (reason?: string) => {
    switch (reason) {
      case "payment_failed":
        return "There was an issue processing your payment. Please check your payment details and try again.";
      case "insufficient_funds":
        return "Your payment method doesn't have sufficient funds. Please use a different payment method.";
      case "session_expired":
        return "Your payment session expired. Please restart the booking process.";
      default:
        return "Your booking was not completed. Don't worry, you can try again or contact our support team for assistance.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cancel Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Booking Cancelled
            </h1>
            <p className="text-orange-100 text-lg">{getCancelReason(reason)}</p>
          </div>

          <div className="px-8 py-6">
            <div className="text-center border-b border-gray-200 pb-6">
              <p className="text-gray-600 text-lg mb-4">
                {getHelpMessage(reason)}
              </p>
              {sessionId && (
                <p className="text-sm text-gray-500">
                  Session ID: {sessionId.slice(-8).toUpperCase()}
                </p>
              )}
              {orderId && (
                <p className="text-sm text-gray-500">
                  Order ID: {orderId.slice(-8).toUpperCase()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              What would you like to do?
            </h3>

            <div className="space-y-4">
              <Link
                href="/cars"
                className="flex items-center gap-4 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Browse Cars Again
                  </h4>
                  <p className="text-sm text-gray-600">
                    Find a different vehicle for your trip
                  </p>
                </div>
              </Link>

              <Link
                href="/cars"
                className="flex items-center gap-4 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <RefreshCw className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Try Booking Again
                  </h4>
                  <p className="text-sm text-gray-600">
                    Restart the booking process
                  </p>
                </div>
              </Link>

              <Link
                href="/"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Back to Home</h4>
                  <p className="text-sm text-gray-600">
                    Return to the main page
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Support Options */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Need Help?
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Call Support</h4>
                  <p className="text-sm text-gray-600">24/7 available</p>
                  <a
                    href="tel:+15551234567"
                    className="text-blue-600 font-medium"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email Support</h4>
                  <p className="text-sm text-gray-600">
                    We'll respond within 2 hours
                  </p>
                  <a
                    href="mailto:support@carrental.com"
                    className="text-green-600 font-medium"
                  >
                    support@carrental.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Live Chat</h4>
                  <p className="text-sm text-gray-600">
                    Chat with our support team
                  </p>
                  <button className="text-purple-600 font-medium hover:underline">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Issues */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Common Issues & Solutions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Payment Method Issues
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check if your card has sufficient funds</li>
                  <li>• Verify card details are correct</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact your bank if card is blocked</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Technical Issues
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Clear your browser cache</li>
                  <li>• Try a different browser</li>
                  <li>• Check your internet connection</li>
                  <li>• Disable ad blockers temporarily</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Booking Problems
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Car may no longer be available</li>
                  <li>• Check if dates are still valid</li>
                  <li>• Verify pickup/dropoff locations</li>
                  <li>• Review age and license requirements</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Account Issues
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Make sure you're logged in</li>
                  <li>• Verify your email address</li>
                  <li>• Update your profile information</li>
                  <li>• Check for account restrictions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Payment Methods */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Alternative Payment Options
              </h4>
              <p className="text-blue-800 mb-4">
                If you're having trouble with your current payment method, we
                accept:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li>• Visa, Mastercard, American Express</li>
                <li>• Debit cards with Visa/Mastercard logo</li>
                <li>• PayPal (coming soon)</li>
                <li>• Bank transfers for longer rentals</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cars"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Booking Again
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
