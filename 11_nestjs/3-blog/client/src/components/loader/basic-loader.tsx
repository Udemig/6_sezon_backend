import { FaSpinner } from "react-icons/fa";

const BasicLoader = () => {
  return (
    <div className="flex justify-center items-center h-full py-[50px]">
      <FaSpinner className="animate-spin text-xl text-yellow-55" />
    </div>
  );
};

export default BasicLoader;
