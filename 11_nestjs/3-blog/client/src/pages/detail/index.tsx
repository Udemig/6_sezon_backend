import { type FC } from "react";
import { useBlog } from "../../hooks/blog.hooks";
import { useParams } from "react-router-dom";
import PageLoader from "../../components/loader/page-loader";
import Error from "../../components/error";
import Comments from "../../components/comments";

const Detail: FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useBlog(id as string);

  if (isLoading) return <PageLoader />;

  if (error) return <Error message={error.message} />;

  return (
    <div>
      <div className="h-[30vh] md:h-[40vh] bg-[url('/banner.png')] bg-cover bg-center flex items-end justify-center pb-10">
        <h1 className="text-4xl md:text-5xl text-center">{data?.title}</h1>
      </div>

      <div className="grid grid-cols-[3fr_1fr] mt-5 border-b border-dark-20">
        <div className="p-5">
          <p>{data?.content}</p>
        </div>

        <div className="border-l border-dark-20">
          <p className="flex flex-col gap-2 border-b border-dark-20 px-3 md:px-5 pb-5">
            <span className="text-sm text-zinc-400">Tarih</span>
            <span>
              {new Date(data!.createdAt).toLocaleDateString("tr", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>

          <div className="flex flex-col gap-5 px-3 md:px-5 py-5">
            {data?.tags.map((tag) => (
              <div key={tag} className="bg-zinc-900 border border-zinc-700 rounded-md text-center">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Comments />
    </div>
  );
};

export default Detail;
