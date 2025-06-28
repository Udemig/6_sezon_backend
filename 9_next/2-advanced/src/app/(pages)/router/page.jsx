"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  // kullanmak için önce bu şekilde kurulumunu yaparız
  const router = useRouter();
  // useSearchParams
  // const searchParams = useSearchParams();

  // console.log("page", searchParams.get("page"));
  // console.log("limit", searchParams.get("limit"));

  return (
    <div className="flex flex-col gap-5 my-10 items-center">
      <button onClick={() => router.forward()}>İleri</button>

      <button onClick={() => router.back()}>Geri</button>

      <button onClick={() => router.refresh()}>Yenile</button>

      <button onClick={() => router.push("/")}>Yönlendir</button>

      <button onClick={() => router.replace("/")}>Yönlendir (Geçmişten Silme)</button>
    </div>
  );
};

export default Page;
