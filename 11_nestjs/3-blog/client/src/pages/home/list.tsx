import Error from "../../components/error";
import BasicLoader from "../../components/loader/basic-loader";
import { useBlogs } from "../../hooks/blog.hooks";
import Post from "./post";
import Tag from "./tag";

const List = () => {
  const { data, isLoading, error } = useBlogs();

  if (isLoading) return <BasicLoader />;

  if (error) return <Error message={error.message} />;

  // gönderilen benzersiz tagler'ini al
  const tags = ["Hepsi", ...new Set(data?.blogs.map((blog) => blog.tags).flat())];

  return (
    <>
      <div className="flex gap-2 border border-dark-15 py-10 lg:py-15 xl:py-20 padding-x overflow-x-auto">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>

      <div className="min-h-[50vh] py-5 lg:py-10 xl:py-15">
        {data?.blogs.map((blog) => (
          <Post key={blog.id} data={blog} />
        ))}
      </div>
    </>
  );
};

export default List;
