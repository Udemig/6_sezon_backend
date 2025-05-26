import type { FC } from "react";
import { FaSpinner } from "react-icons/fa";

interface Props {
  designs?: string;
}

const Loader: FC<Props> = ({ designs }) => {
  return (
    <div className={`flex justify-center`}>
      <FaSpinner className={`animate-spin text-2xl text-green-500  ${designs}`} />
    </div>
  );
};

export default Loader;
