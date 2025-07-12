import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default stripe;

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100); // Convert to cents
};

export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100; // Convert from cents
};

export const createPaymentIntent = async (
  amount: number,
  currency = "usd",
  metadata?: Record<string, string>
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency,
      metadata,
    });
    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const confirmPaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error("Error confirming payment intent:", error);
    throw error;
  }
};

export const createRefund = async (
  paymentIntentId: string,
  amount?: number
) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? formatAmountForStripe(amount) : undefined,
    });
    return refund;
  } catch (error) {
    console.error("Error creating refund:", error);
    throw error;
  }
};
