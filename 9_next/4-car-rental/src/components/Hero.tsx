import Link from "next/link";
import { generateCarImageUrl } from "@/lib/utils";

export default function Hero() {
  // Sample car data for hero images
  const sportsCar = { make: "nissan", modelName: "gt-r", year: 2024 };
  const luxuryCar = { make: "audi", modelName: "a8", year: 2024 };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Banner */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-zinc-100">
              The Best Platform
              <br />
              for Car Rental
            </h2>
            <p className="text-blue-100 mb-6 max-w-md">
              Ease of doing a car rental safely and reliably. Of course at a low
              price.
            </p>
            <Link
              href="/cars"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block transition-colors"
            >
              Rental Car
            </Link>
          </div>

          {/* Car Image */}
          <div className="absolute right-5 bottom-5 transform translate-x-4 translate-y-4">
            <img
              src={generateCarImageUrl(sportsCar, "05")}
              alt="Sports Car"
              className="w-80 h-32 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>

        {/* Right Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-zinc-100">
              Easy way to rent
              <br />a car at a low price
            </h2>
            <p className="text-blue-100 mb-6 max-w-md">
              Providing cheap car rental services and safe and comfortable
              facilities.
            </p>
            <Link
              href="/cars"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
            >
              Rental Car
            </Link>
          </div>

          {/* Car Image */}
          <div className="absolute right-5 bottom-5 transform translate-x-4 translate-y-4">
            <img
              src={generateCarImageUrl(luxuryCar, "05")}
              alt="Nissan GT-R"
              className="w-80 h-32 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
