"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

interface UserDropdownProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string | null;
    isAdmin: boolean;
    isEmailVerified: boolean;
    name?: string | null;
  } | null;
  isAuthenticated: boolean;
}

export default function UserDropdown({
  user,
  isAuthenticated,
}: UserDropdownProps) {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.firstName}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-[99999] border">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/bookings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            My Bookings
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full  text-left px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
