import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 mb-4 block"
            >
              MORENT
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/featured"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  href="/partnership"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Partnership
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Business Relation
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  href="/invite"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Invite a friend
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Socials</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/discord"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="/instagram"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="/facebook"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            ©2022 MORENT. All rights reserved
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Privacy & Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
