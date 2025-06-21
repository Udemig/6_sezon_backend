"use client";

import Link from "next/link";
import { useState } from "react";

const Layout = ({ children }) => {
  const [name, setName] = useState("");

  if ("kullanıncın oturumunu açıksa") {
    // anasayfaya yönlendir
  }

  return (
    <div className="flex gap-20">
      <aside className="border p-5 px-10 rounded-md flex flex-col text-2xl gap-5">
        <h1>Selam, {name}</h1>
        <input type="text" onChange={(e) => setName(e.target.value)} className="border rounded-md" />
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </aside>

      {children}
    </div>
  );
};

export default Layout;
