"use client";

import Image from "next/image";
import logo from "@/assets/logo.webp";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className={`p-6 border-b border-zinc-800 ${isCollapsed ? "px-4" : ""}`}>
        <div className={`bg-white rounded-full ${!isCollapsed ? "flex items-center gap-4" : ""}`}>
          <Image src={logo} alt="logo" width={50} height={50} />
          {!isCollapsed && <h1 className="text-zinc-900 text-4xl font-smooch font-bold">Rudder</h1>}
        </div>
      </div>

      {/*todo: Navigation */}
      <nav></nav>
    </aside>
  );
};

export default Sidebar;
