import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Banner */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
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
          <div className="absolute right-0 bottom-0 transform translate-x-4 translate-y-4">
            <div className="w-80 h-32 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-12 bg-white/30 rounded mx-auto mb-2"></div>
                <p className="text-xs text-blue-100">Sports Car</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
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
          <div className="absolute right-0 bottom-0 transform translate-x-4 translate-y-4">
            <div className="w-80 h-32 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-12 bg-white/30 rounded mx-auto mb-2"></div>
                <p className="text-xs text-blue-100">Nissan GT-R</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
