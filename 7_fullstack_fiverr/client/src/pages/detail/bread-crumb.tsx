import type { FC } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

interface Props {
  category: string;
}

const BreadCrumb: FC<Props> = ({ category }) => {
  return (
    <div className="my-5">
      <p className="flex gap-3 items-center text-gray-500">
        <Link to="/">
          <AiOutlineHome />
        </Link>

        <span>/</span>

        <Link to={`/search?category=${category}`} className="hover:underline">
          {category}
        </Link>
      </p>
    </div>
  );
};

export default BreadCrumb;
