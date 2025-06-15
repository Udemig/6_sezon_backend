import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { NextFunction } from "express";
import e from "../utils/error.js";
import { config } from "../config/enviroment.js";

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
});

// Upload an image
const upload = async (
  next: NextFunction,
  file_path: string,
  folder: string,
  width?: number,
  height?: number,
  crop?: string,
  quality?: string,
  type: "image" | "video" | "raw" | "auto" | undefined = "auto"
) => {
  return await cloudinary.uploader.upload(
    file_path,
    {
      folder,
      resource_type: type,
      width,
      height,
      crop,
      quality,
    },
    (err) => {
      if (err) return next(e(400, "Fotoğraf yüklenemedi"));
    }
  );
};

export default upload;
