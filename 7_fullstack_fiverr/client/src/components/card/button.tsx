import type { FC } from "react";
import { useDeleteGig } from "../../service/gig";
import Loader from "../loader";

interface Props {
  id: string;
  show: boolean;
}

const Button: FC<Props> = ({ id, show }) => {
  // mutasyonu kur
  const { mutate, isPending } = useDeleteGig(id);

  // butona tıklanınca
  const handleClick = () => {
    // kullanıcı onaylamazsa fonksiyonu durdur
    if (!confirm("Silmeyi onaylıyorum")) return;

    // api'dan hizmeti kaldır
    mutate();
  };

  return (
    show && (
      <div className="flex justify-end px-2">
        <button disabled={isPending} className="button bg-red-500 cursor-pointer h-8" onClick={handleClick}>
          {isPending ? <Loader designs="!text-lg text-white" /> : "Sil "}
        </button>
      </div>
    )
  );
};

export default Button;
