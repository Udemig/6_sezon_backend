"use client";

import { deleteTicket } from "@/utils/service";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  id: string;
}

const DeleteButton: FC<Props> = ({ id }) => {
  const router = useRouter();

  const handleDelete = () => {
    // kullanıcının onayını al
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;

    // silme için api isteği at
    deleteTicket(id)
      // silinen elemanın ekranan ayrılması için component'ı yenile
      .then(() => router.refresh());
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 transition">
      <Trash className="size-4" />
    </button>
  );
};

export default DeleteButton;
