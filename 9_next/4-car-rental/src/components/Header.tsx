import Link from "next/link";
import { Search, Heart, Bell, Settings } from "lucide-react";
import { getCurrentUser } from "@/lib/auth-utils";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MORENT
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search something here"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Icons */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>

            {/* User Profile / Auth Section */}
            <UserDropdown user={user} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </header>
  );
}
