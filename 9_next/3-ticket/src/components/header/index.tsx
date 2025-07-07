import { Bell, Mail, Search, Settings, User } from "lucide-react";
import Statistics from "./statistics";
import { Suspense } from "react";
import Loading from "./loading";

const Header = () => {
  return (
    <>
      <header className="h-21 bg-zinc-900 border-b border-zinc-800 px-6 py-[18px] ">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="text"
                placeholder="Ticket ara..."
                className="w-full pl-10 pr-4 py-2 border-zinc-700 rounded-lg bg-zinc-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* İconlar */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-100 hover:bg-zinc-800 rounded-lg transition">
              <Bell className="size-5" />

              <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button className="relative p-2 text-gray-400 hover:text-gray-100 hover:bg-zinc-800 rounded-lg transition">
              <Mail className="size-5" />

              <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>

            <button className="p-2 text-gray-400 hover:text-gray-100 hover:bg-zinc-800 rounded-lg transition">
              <Settings className="size-5" />
            </button>

            {/* Profil */}
            <div className="relative">
              <button className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-lg transition">
                <div className="size-8 bg-blue-600 rounded-full grid place-items-center">
                  <User className="size-4 text-white" />
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm text-gray-100">Kullanıcı</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={<Loading />}>
        <Statistics />
      </Suspense>
    </>
  );
};

export default Header;
