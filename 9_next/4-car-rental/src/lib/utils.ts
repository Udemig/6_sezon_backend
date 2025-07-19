import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function generateCarImageUrl(
  car: { make: string; modelName: string; year: number },
  angle: number | string = 23
): string {
  // Format the model name to be URL-friendly
  const formatModel = (model: string) =>
    model.toLowerCase().replace(/\s+/g, "-");

  const baseUrl = "https://cdn.imagin.studio/getImage";
  const params = new URLSearchParams({
    customer: "hrjavascript-mastery",
    make: car.make.toLowerCase(),
    modelFamily: formatModel(car.modelName),
    modelRange: formatModel(car.modelName),
    modelYear: car.year.toString(),
    angle: angle.toString(),
    zoomtype: "fullscreen",
  });

  return `${baseUrl}?${params.toString()}`;
}
