import { NextResponse } from "next/server";
import { products } from "../../data";

export const GET = async (request) => {
  // istek ile gelen arama parametrelerine eirşme
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // arama paremetresiyle gelen değer göre filtrele
  const filtred = products.filter((i) => i.category === category);

  // client'a cevap gönderirken res yerine NextResponse.
  return NextResponse.json({
    successs: true,
    message: "Ürün verileri sağlandı",
    data: filtred || products,
    category,
  });
};

export const POST = async (request) => {
  // isteğin body bölümüyle gelen veriye erişme
  const body = await request.json();

  return NextResponse.json(
    {
      successs: true,
      message: "Yeni ürün oluşturuldu",
      data: body,
    },
    { status: 201 }
  );
};
