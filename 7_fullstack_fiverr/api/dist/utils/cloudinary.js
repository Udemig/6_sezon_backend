import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import e from "../utils/error.js";
dotenv.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
// Upload an image
const upload = async (next, file_path, folder, width, height, crop, quality, type = "auto") => {
    return await cloudinary.uploader.upload(file_path, {
        folder,
        resource_type: type,
        width,
        height,
        crop,
        quality,
    }, (err) => {
        if (err)
            return next(e(400, "Fotoğraf yüklenemedi"));
    });
};
export default upload;
