"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href }) => {
  const currentPath = usePathname();

  return (
    <Link href={href} className={href === currentPath ? "font-bold text-red-500" : ""}>
      {children}
    </Link>
  );
};

export default NavLink;
