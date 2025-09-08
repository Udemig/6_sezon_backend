import type { FC } from "react";
import { useDeleteBlog, useOwnBlogs } from "../../hooks/blog.hooks";
import PageLoader from "../../components/loader/page-loader";
import Error from "../../components/error";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrash } from "react-icons/fa";

//TODO: BLOG DÜZENLEME YÖNLENDİRMESİNDE SORUN VAR

const OwnBlogs: FC = () => {
  const { data, isLoading, error } = useOwnBlogs();
  const { mutate, isPending } = useDeleteBlog();

  if (isLoading) return <PageLoader />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="py-5 padding-x">
      <h1 className="text-2xl font-bold">Bloglarım</h1>

      <div className="grid grid-cols-1 gap-5 mt-10">
        {data?.blogs.map((blog) => (
          <div key={blog.id} className="border-b border-dark-15 pb-5">
            <h2 className="font-semibold mb-2">{blog.title}</h2>
            <p className="text-zinc-400">
              {blog.content.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}
            </p>

            <div className="mt-5 flex gap-5">
              <Link to={`/blog/${blog.id}`} className="blog-button">
                Blog'a Git
                <FaArrowRight className="size-3 text-yellow-55" />
              </Link>

              <Link to={`/blog/${blog.id}/edit`} className="blog-button">
                Blog'u Düzenle
                <FaArrowRight className="size-3 text-yellow-55" />
              </Link>

              <button disabled={isPending} onClick={() => mutate(blog.id)} className="blog-button">
                Blog'u Sil
                <FaTrash className="size-3 text-yellow-55" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnBlogs;
