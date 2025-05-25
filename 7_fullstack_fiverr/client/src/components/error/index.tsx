import type { AxiosError } from "axios";
import type { FC } from "react";

interface Props {
  error: AxiosError<{ message?: string }>;
  refetch?: () => void;
}

const Error: FC<Props> = ({ error, refetch }) => {
  const info = error.response?.data?.message;
  const isNotFound = info === "Aranılan kriterlere uygun hizmet bulunamadı";

  return isNotFound ? (
    <div className="warning font-semibold">{info}</div>
  ) : (
    <div className="warning bg-red-500/70">
      <p className="font-semibold">{info || "Üzgünüz bir hata oluştu"}</p>

      <p className="my-5">Lütfen daha sonra tekrar deneyiniz</p>

      {refetch && (
        <button onClick={refetch} className="border rounded-md px-2 py-1 hover:bg-white/20 transition cursor-pointer">
          Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default Error;
