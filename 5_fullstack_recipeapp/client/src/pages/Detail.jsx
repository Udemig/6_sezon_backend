import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import DeleteButton from "../components/DeleteButton";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa";

const Detail = () => {
  const { id } = useParams();

  //id'si bilinen elemnaın bilgilerini api'den al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Link to={-1} className="btn flex items-center gap-2 py-1">
          <IoMdArrowRoundBack />
          Geri
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/düzenle/${data?.id}`}
            className="btn flex gap-2 items-center bg-blue-500 hover:bh-blue-600 py-1 min-w-[80px] justify-center "
          >
            <MdEdit />
            Düzenle
          </Link>

          <DeleteButton disabled={!data?.id} productId={data?.id} />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <div>
            <h1 className="title text-3xl"> {data.recipeName} </h1>

            <div className="flex gap-4 my-5">
              <span className="badge">
                <PiForkKnifeFill />
                {data.category}{" "}
              </span>
              <span className="badge">
                <FaClock />
                {data.recipeTime} dak.
              </span>
            </div>

            <img
              className="rounded-lg max-h-[350px] w-full object-cover"
              src={data.image}
              alt={data.recipeName}
            />

            <div className="my-5">
              <h2 className="title">Malzemeler</h2>

              <ul>
                {data.ingredients.map((i, key) => (
                  <li className="font-semibold text-lg" key={key}>
                    {" "}
                    {i}{" "}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-5">
              <h2 className="title">Malzemeler</h2>

              <ol className="list-decimal ps-4">
                {data.instructions.map((i, key) => (
                  <li className="font-semibold text-lg" key={key}>
                    {" "}
                    {i}{" "}
                  </li>
                ))}
              </ol>
            </div>

            {data.servingSuggestion && (
              <div className="my-5">
                <h2 className="title">Sunum Önerisi</h2>

                <p className="text-lg font-semibold">
                  {" "}
                  {data.servingSuggestion}{" "}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Detail;
