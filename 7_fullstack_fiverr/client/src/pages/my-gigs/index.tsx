import type { FC } from "react";
import { useProfile } from "../../service/auth";
import { useGetAllGigs } from "../../service/gig";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import type { Err } from "../../types";

const MyGigs: FC = () => {
  // kullanıcnın profile verilerini al
  const { user } = useProfile();

  // kullanıcya ait hizmet verilerini al
  const { isLoading, error, data, refetch } = useGetAllGigs({ userId: user!.id });

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">Hizmetlerim</h1>

      <div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error as Err} refetch={refetch} />
        ) : (
          data && (
            <div className="layout">
              {data.map((item) => (
                <Card key={item._id} item={item} expand />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyGigs;
