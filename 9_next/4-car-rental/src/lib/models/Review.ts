import mongoose from "mongoose";

export interface IReview extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  isApproved: boolean;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
reviewSchema.index({ carId: 1, isApproved: 1, isHidden: 1 });
reviewSchema.index({ userId: 1, createdAt: -1 });
reviewSchema.index({ bookingId: 1 });

// Ensure one review per booking
reviewSchema.index({ bookingId: 1 }, { unique: true });

const Review =
  mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;
