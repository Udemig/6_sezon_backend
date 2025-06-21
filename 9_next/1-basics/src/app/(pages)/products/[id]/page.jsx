// Statik metadata tanımı
// export const metadata = {
//   title: "Ürün Detay",
//   description: "Ürün detay bilgileri burada",
// };

// Dinamik metadata tanımı
// generateMetadata parametrete olarak component'ın aldığı propları alır
export const generateMetadata = async ({ params }) => {
  const { id } = await params;

  // api'dan ürün bilgileri alınır...

  return {
    title: `${id}. Ürün Detayı`,
    description: "Ürün detay bilgileri burada",
  };
};

/*
 * Next.js'de component prop olarak params/searchParams'ı alır.
 * Bu proplar promise olarak geldiği için async await aracılığıyla params'ı bekleyerek url'deki parametrelere erişebiliriz
 */
const Detail = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <h1 className="text-center text-yellow-500">{id}</h1>
      <h1>Ürün Detay Sayfası</h1>
    </div>
  );
};

export default Detail;
