import React, { useEffect } from "react";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Hero from "../components/Hero";

const Main = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/api/movies").then((res) => res.data),
  });

  console.log(isLoading, error, data);

  return (
    <div>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 md:px-10">
          {data.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
