import { model, Schema } from "mongoose";
import type { IMenuItem, IOpeningHours, IRestaurant } from "./types/index.ts";

// açılış saatleri
const openingHoursSchema = new Schema<IOpeningHours>({
  monday: { type: String, required: true },
  tuesday: { type: String, required: true },
  wednesday: { type: String, required: true },
  thursday: { type: String, required: true },
  friday: { type: String, required: true },
  saturday: { type: String, required: true },
  sunday: { type: String, required: true },
});

// schema
const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    categories: { type: [String], required: true, default: [] },
    deliveryTime: { type: Number, required: true },
    minOrder: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    rating: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    openingHours: { type: openingHoursSchema, required: true },
    ownerId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// ürün şeması
const menuItemSchema = new Schema<IMenuItem>(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, default: null },
    ingredients: { type: [String], default: [] },
    allergens: { type: [String], default: [] },
    isVegetarian: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// model
const Restaurant = model("Restaurant", restaurantSchema);
const MenuItem = model("MenuItem", menuItemSchema);
export { Restaurant, MenuItem };
