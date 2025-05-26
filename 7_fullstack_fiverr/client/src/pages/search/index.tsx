import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllGigs } from "../../service/gig";
import Title from "./title";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import type { Err } from "../../types";

const Search: FC = () => {
  const [searchParams] = useSearchParams();

  // url'deki parameterelere eriş
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  // api'a gönderilecek parmetreleri oluştur
  const params = {
    category,
    search: query,
  };

  // api'dan hizmet verilerini al
  const { isLoading, error, data, refetch } = useGetAllGigs(params);

  return (
    <div>
      <Title search={query} category={category} />

      {isLoading ? (
        <Loader designs="my-40" />
      ) : error ? (
        <Error error={error as Err} refetch={refetch} />
      ) : (
        <div className="layout">
          {data?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
