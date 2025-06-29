import { products } from "@/app/api/data";
import { NextResponse as Res } from "next/server";
import { cookies, headers } from "next/headers";

export const GET = async (request, { params }) => {
  const { id } = await params;
  const found = products.find((i) => i.id === Number(id));

  if (!found) {
    return Res.json({ message: "Aradığınız ürün bulunamadı" }, { status: 404 });
  }

  return Res.json({
    message: "Ürün bulundu",
    data: found,
  });
};

export const PUT = async (req) => {
  // çerezlere erişme - v1
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang");

  // headerlara erişme - v1
  const headerStore = await headers();
  const jwt_key = headerStore.get("Authorization");

  // query params erişme - v1
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  return Res.json({
    message: "Selamm",
    lang: lang.value,
    jwt_key,
    category,
  });
};

export const PATCH = async (req) => {
  // çerezlere erişme - v2
  const lang = req.cookies.get("lang");

  // headerlara erişme - v2
  const headerStore = new Headers(req.headers);
  const jwt_key = headerStore.get("Authorization");

  // query params erişme - v2
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get("category");

  return Res.json({
    message: "Selamm",
    lang: lang.value,
    jwt_key,
    category,
  });
};
