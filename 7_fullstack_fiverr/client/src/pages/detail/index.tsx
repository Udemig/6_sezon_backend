import { use, type FC } from "react";
import { useParams } from "react-router-dom";
import { useGetOneGig } from "../../service/gig";
import Loader from "../../components/loader";
import Error from "../../components/error";
import BreadCrumb from "./bread-crumb";
import GigInfo from "./gig-info";
import UserInfo from "./user-info";
import PackageInfo from "./package-info";
import type { Err } from "../../types";

const Detail: FC = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useGetOneGig(id as string);

  if (isLoading) return <Loader designs="my-40" />;

  if (error) return <Error error={error as Err} refetch={refetch} />;

  if (!data) return <p className="warning">İçerik yok veya kaldırıldı</p>;

  return (
    <div className="md:px-10 xl:px-15">
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
