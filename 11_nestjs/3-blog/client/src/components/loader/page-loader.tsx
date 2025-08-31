import { FaSpinner } from "react-icons/fa";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-160px)]">
      <FaSpinner className="animate-spin text-xl text-yellow-55" />
    </div>
  );
};

export default PageLoader;
