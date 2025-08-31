import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import PageLoader from "../loader/page-loader";

const Protected = () => {
  // auth context'den user ve loading'i al
  const { loading, user } = useAuth();

  // loading true ise loading ikonunu ekrana bas
  if (loading) return <PageLoader />;

  // user yoksa anasayfaya yönlendir
  if (user === null) return <Navigate to="/" />;

  // alt route'un içeriğini ekrana bas
  return <Outlet />;
};

export default Protected;
