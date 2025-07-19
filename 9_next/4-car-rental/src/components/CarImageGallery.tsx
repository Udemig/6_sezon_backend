"use client";

import { useState } from "react";
import { generateCarImageUrl } from "@/lib/utils";
import { Car, CarImageGalleryProps } from "@/types";

export default function CarImageGallery({ car }: CarImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Different angles for image gallery
  const imageAngles = ["01", "05", "29", "33"];
  const carName = `${car.make} ${car.modelName}`;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={generateCarImageUrl(car, imageAngles[selectedImageIndex])}
            alt={carName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2">
          {imageAngles.map((angle, index) => (
            <button
              key={angle}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-20 h-16 bg-gray-100 rounded-lg overflow-hidden ${
                selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={generateCarImageUrl(car, angle)}
                alt={`${carName} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
