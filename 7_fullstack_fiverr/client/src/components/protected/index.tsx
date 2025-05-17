import type { FC } from "react";
import { useProfile } from "../../service/auth";
import Loader from "../loader";
import { Navigate, Outlet } from "react-router-dom";

const Protected: FC = () => {
  // oturumu açık olan kullanıcı verisini al
  const { user, isLoading } = useProfile();

  // kullanıcı verisi yüklenene kadar loader bas
  if (isLoading) return <Loader />;

  // kullanıncın oturumu kapalıysa veya satıcı hesabı değilse:
  // sayfaya girmesine izin verme ve logine yönlendir
  if (!user || !user.isSeller) return <Navigate to="/login" replace />;

  // kullanıcı satıcı hesabındaysa sayfayı gster
  return <Outlet />;
};

export default Protected;
