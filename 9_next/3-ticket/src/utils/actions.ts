"use server";

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// server action içinde olduğumuz için doğrudan vt sorguları yapabiliriz

export async function createTicketAction(formData: FormData) {
  // formdata içerisinden gerekli bilgileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // veritbanına bağlan
  await connectMongo();

  // yeni ticket oluştur
  const newTicket = await Ticket.create(rawData);

  // statik sayfaları yeniden oluştur
  revalidatePath("/tickets");
  revalidatePath("/");
  revalidatePath(`/ticket/${newTicket._id.toString()}`);

  // tickets sayfaına yönlendir
  redirect("/tickets");
}

export async function updateTicketAction(formData: FormData) {
  // güncellenicek elmanın idsi
  const id = formData.get("id");

  // formdata içerisinden gerekli bilgileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // veritbanına bağlan
  await connectMongo();

  // ticket vt'nında güncelle
  const updatedTicket = await Ticket.findByIdAndUpdate(id, rawData, {});

  // statik sayfaları yeniden oluştur
  revalidatePath("/tickets");
  revalidatePath("/");
  revalidatePath(`/ticket/${updatedTicket._id.toString()}`);

  // tickets sayfasına yönlendir
  redirect("/tickets");
}
