import { type FC } from "react";
import { IoSearch } from "react-icons/io5";

const Hero: FC = () => {
  return (
    <div className="bg-[#0a4226] max-md:m-[-20px] h-[40vh] text-white px-6 py-5 md:px-12 md:py-10 md:rounded-md flex flex-col justify-center items-center">
      <div className="max-w-[600px]">
        <h1 className="text-4xl md:text-5xl font-light md:text-center">
          Profesyonel iş gücünüzü <span className="font-serif">freelancer'larla</span> ölçeklendirin
        </h1>

        <form className="bg-white rounded-md w-full flex gap-5 mt-10">
          <input type="text" className="flex-1 p-2 rounded-md text-black outline-none" placeholder="hizmet ara..." />
          <button className="bg-[#0a4226] m-1 p-2 rounded-md hover:opacity-75 transition cursor-pointer">
            <IoSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
