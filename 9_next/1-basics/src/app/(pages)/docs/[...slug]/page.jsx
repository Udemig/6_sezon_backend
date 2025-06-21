import { notFound } from "next/navigation";

const Doc = async ({ params }) => {
  const { slug } = await params;

  // eğer parametre sayısı 3'ü geçerse kullanıcyı 404 sayfasına yönlendir
  if (slug.length >= 3) return notFound();

  return (
    <div className="flex flex-col gap-10">
      {slug.map((param) => (
        <p>{param}</p>
      ))}
      görüntüleniyor
    </div>
  );
};

export default Doc;
