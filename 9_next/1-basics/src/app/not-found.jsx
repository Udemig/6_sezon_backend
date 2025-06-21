import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-10 text-center">
      <h1 className="text-yellow-500">404</h1>

      <p>Üzgünüz aradığınız sayfa bulununamadı</p>

      <Link href="/" className="text-blue-500 text-lg">
        Anasayfa'ya Göz Atın
      </Link>
    </div>
  );
};

export default NotFound;
