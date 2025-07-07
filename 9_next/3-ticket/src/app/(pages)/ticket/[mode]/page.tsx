import Form from "@/components/form";
import { Ticket } from "@/types";
import { getTicket } from "@/utils/service";
import { FC } from "react";

interface Props {
  params: Promise<{
    mode: string;
  }>;
}

const Page: FC<Props> = async ({ params }) => {
  // url'deki parametreye eriş
  const { mode } = await params;

  // aldığımız parametreye göre form hangi modda çalışacak
  const isEditMode = mode !== "add" ? true : false;

  // güncellenicek eleman
  let editItem: Ticket | null = null;

  // eğer güncelleme modundaysak güncellenicek ticket'ı al
  if (isEditMode) {
    editItem = (await getTicket(mode)).ticket;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl text-zinc-500">{isEditMode ? "Ticket'ı Güncelle" : "Ticket Oluştur"}</h1>

      <Form isEditMode={isEditMode} editItem={editItem} />
    </div>
  );
};

export default Page;
