import { NextResponse } from "next/server";

export const GET = (request) => {
  return NextResponse.json({
    successs: true,
    message: "Kullanıcı listesi gönderildi",
  });
};
