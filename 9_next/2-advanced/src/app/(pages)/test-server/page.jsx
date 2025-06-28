import { notFound, redirect } from "next/navigation";

const handleAction = async () => {
  "use server"; // server action olarka ifade etmemizi sağlar

  // inputlardaki veirlere eriş..

  // api'a istek at...
};

const Page = () => {
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

      <form action={handleAction} className="flex flex-col gap-4 my-10">
        <input type="text" placeholder="isim" className="flex-1 border rounded p-2" />
        <input type="text" placeholder="şifre" className="flex-1 border rounded p-2" />

        <button className="border rounded p-2 mt-2">Gönder</button>
      </form>
    </div>
  );
};

export default Page;
