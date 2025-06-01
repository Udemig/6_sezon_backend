import { Schema, model } from "mongoose";
import { defaultProfile } from "../utils/constants.js";

// kullanıcı belgesinin typescrip tipi
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  country: string;
  isSeller: boolean;
  phone?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// mongodb schema'sını oluştur
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: [true, "Bu kullanıcı ismi zaten kullanımda"],
      required: [true, "Lütfen username alanını belirleyin"],
    },
    email: {
      type: String,
      unique: [true, "Bu mail adresi zaten kullanımda"],
      required: [true, "Lütfen email alanını belirleyin"],
    },
    password: {
      type: String,
      required: [true, "Lütfen password alanını belirleyin"],
    },
    country: {
      type: String,
      required: [true, "Lütfen country alanını belirleyin"],
    },
    profilePicture: {
      type: String,
      default: defaultProfile,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // oluşturma ve güncelleme tarihlerini tutar,
    toJSON: {
      // client'a göndermek istemediğimiz verileri response'dan kaldırıyoruz
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// mongodb model'ini oluştur
const User = model<IUser>("User", userSchema);

// model'i export et
export default User;
