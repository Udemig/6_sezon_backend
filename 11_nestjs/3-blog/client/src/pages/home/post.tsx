import type { FC } from "react";
import type { Blog } from "../../types";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRegComment, FaRegHeart, FaRegShareSquare } from "react-icons/fa";

interface Props {
  data: Blog;
}

const Post: FC<Props> = ({ data }) => {
  return (
    <Link
      to={`/blog/${data.id}`}
      className="flex flex-col gap-5 md:gap-12 md:grid md:grid-cols-[1fr_2fr_1fr] py-5 padding-x border-b border-dark-20"
    >
      <div className="flex gap-3">
        <img src="/avatar.jpg" className="size-10 rounded-full" />

        <div className="max-md:flex items-center gap-3">
          <h5 className="font-semibold">{data.author.username}</h5>
          <span className="text-sm text-gray-400">{data.author.email}</span>
          <p className="text-sm text-gray-400">
            {new Date(data.createdAt).toLocaleDateString("tr", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{data.title}</h2>

          <p className="text-sm text-gray-400">
            {data.content.length > 100 ? data.content.slice(0, 100) + "..." : data.content}
          </p>
        </div>

        <div className="flex gap-5 mt-5">
          <button className="post-btn">
            <FaRegHeart />
            <span className="text-sm">{Math.round(Math.random() * 100)}</span>
          </button>

          <button className="post-btn">
            <FaRegComment />
            <span className="text-sm">{99}</span>
          </button>

          <button className="post-btn">
            <FaRegShareSquare />
            <span className="text-sm">{Math.round(Math.random() * 10)}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center max-md:hidden">
        <button className="border border-zinc-700 rounded-lg py-2 px-4 flex items-center gap-2 cursor-pointer hover:bg-zinc-800">
          <span className="text-gray-400">Blog'a Git</span>
          <FaArrowRight className="text-yellow-55" />
        </button>
      </div>
    </Link>
  );
};

export default Post;
