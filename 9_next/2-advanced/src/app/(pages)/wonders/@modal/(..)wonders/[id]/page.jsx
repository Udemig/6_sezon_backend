"use client";
import { data } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const item = data.find((i) => i.id === id);

  // 1 sayfa geriye git (önizleme modalı kapanır)
  const handleClose = () => {
    // 1 sayfa geriye yönlendir
    router.back();

    // 1 sayfa ileriye yönlendir
    router.forward();

    // belirli bir sayfaya yönlendir
    router.push("/wonders");

    // belirli bir sayfaya yönlendir (mevcut sayfayı geçmişten sil)
    router.replace("/wonders");

    // sayfayı tekrar renderla
    router.refresh();
  };

  // sayfayı yenile (önizleme modalı kapanır detay sayfasına gider)
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs grid place-items-center">
      <div className="bg-white rounded-md px-10 pb-10 text-black text-5xl flex flex-col gap-5 w-4/5 h-4/5 md:w-2/3 overflow-auto">
        <div className="flex justify-between my-5 text-lg">
          <button className="btn" onClick={handleClose}>
            X
          </button>

          <button className="btn" onClick={handleRefresh}>
            ?
          </button>
        </div>

        <Image src={item.src} alt={item.name} className="aspect-square max-h-[400px] object-cover rounded-md" />

        <h2>{item.name}</h2>

        <div className="my-2">
          <h3 className="text-lg">Fotoğrafçı</h3>
          <span className="text-2xl font-semibold">{item.photographer}</span>
        </div>

        <div className="my-2">
          <h3 className="text-lg">Lokasyon</h3>
          <span className="text-2xl font-semibold">{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
