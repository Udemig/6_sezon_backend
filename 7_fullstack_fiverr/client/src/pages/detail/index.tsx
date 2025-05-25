import { use, type FC } from "react";
import { useParams } from "react-router-dom";
import { useGetOneGig } from "../../service/gig";
import Loader from "../../components/loader";
import Error from "../../components/error";
import type { Axios, AxiosError } from "axios";
import BreadCrumb from "./bread-crumb";
import GigInfo from "./gig-info";
import UserInfo from "./user-info";
import PackageInfo from "./package-info";

const Detail: FC = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useGetOneGig(id as string);

  if (isLoading) return <Loader designs="my-40" />;

  if (error) return <Error error={error as AxiosError<{ message: string }>} refetch={refetch} />;

  if (!data) return <p className="warning">İçerik yok veya kaldırıldı</p>;

  return (
    <div className="md:px-20 lg:px-30">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="overflow-y-auto">
          <BreadCrumb category={data.category} />
          <GigInfo gig={data} />
          <UserInfo user={data.user} />
        </div>

        <PackageInfo gig={data} />
      </div>
    </div>
  );
};

export default Detail;
