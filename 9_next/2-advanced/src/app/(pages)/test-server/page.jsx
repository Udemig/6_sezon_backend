"use client";
import { notFound, redirect } from "next/navigation";
import { useActionState } from "react";
import handleAction from "@/utils/server";

const Page = () => {
  // useActionState: sadece client componetlarda kullanılır
  // çalıştırılan aksiyonun state'ini takip etmeye yarar
  const [state, formAction, pending] = useActionState(handleAction, null);

  if ("eğer kullanıcı admin değilse") {
    // redirect("/");
    // notFound();
  }

  return (
    <div>
      <h1>Form</h1>

      <form action="/recipes" className="flex gap-4 my-10">
        <input name="query" type="text" placeholder="ara...." className="flex-1 border rounded p-2" />

        <button className="border rounded p-2">Ara</button>
      </form>

      <hr />

      <form action={formAction} className="flex flex-col gap-4 my-10">
        <input name="email" type="text" placeholder="isim" className="flex-1 border rounded p-2" />
        <input name="password" type="text" placeholder="şifre" className="flex-1 border rounded p-2" />

        <button disabled={pending} className="border rounded p-2 mt-2">
          Gönder
        </button>
      </form>
    </div>
  );
};

export default Page;
