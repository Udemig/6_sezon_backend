import Link from "next/link";

const Layout = ({ children, revenue, users, notifications }) => {
  return (
    <>
      <div className="flex justify-center gap-5 text-lg text-blue-500 underline">
        <Link href="/dashboard">Admin Paneli</Link>
        <Link href="/dashboard/settings">Panel Ayarları</Link>
      </div>

      <div className="p-4 my-10">
        {children}

        <div className="flex mt-10">
          <div className="flex-1">
            <div className="border p-5">{users}</div>
            <div className="border p-5">{revenue}</div>
          </div>

          <div className="border p-5">{notifications}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
