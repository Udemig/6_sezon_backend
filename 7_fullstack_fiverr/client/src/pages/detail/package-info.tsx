import type { FC } from "react";
import type { IGig, IUser } from "../../types";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";
import { IoIosArrowDown, IoMdCheckmark, IoIosInformationCircleOutline } from "react-icons/io";

interface Props {
  gig: IGig<IUser>;
}

const PackageInfo: FC<Props> = ({ gig }) => {
  return (
    <div className="h-fit flex flex-col gap-6 border shadow rounded-md p-5 mb-20 md:mt-20 md:sticky md:top-20 border-zinc-200">
      <div className="flex justify-between font-semibold gap-10">
        <h2 className="text-xl">{gig.packageTitle}</h2>
        <p className="text-xl font-normal flex items-center gap-2">
          ${gig.packagePrice}
          <IoIosInformationCircleOutline title="To keep things simple, Fiverr may round up prices that contain decimals. The number you see here is the price used" />
        </p>
      </div>

      <p className="text-gray-600 text-lg">{gig.packageDescription}</p>

      <div className="flex gap-5 font-semibold text-sm whitespace-nowrap">
        <p className="flex items-center gap-2">
          <FaRegClock className="text-lg" />
          {gig.packageDuration} günde teslimat
        </p>
        <p className="flex items-center gap-2">
          <GiRecycle className="text-lg" />
          {gig.packageRevisions} revizyon
        </p>
      </div>

      <ul>
        {gig.packageFeatures.map((i) => (
          <li className="flex gap-2 items-center">
            <IoMdCheckmark className="text-black" />
            <span className="text-gray-500">{i}</span>
          </li>
        ))}
      </ul>

      <button className="flex items-center bg-black text-white p-2 rounded-md hover:bg-zinc-700 transition cursor-pointer md:min-w-[350px]">
        <span className="flex-1 font-semibold">Devam Et</span>
        <FaArrowRight />
      </button>

      <button className="flex gap-2 items-center justify-center bg-white text-black p-2 rounded-md hover:bg-zinc-200 transition cursor-pointer border border-zinc-300">
        <span className="font-semibold">İletişime Geç</span>
        <IoIosArrowDown />
      </button>
    </div>
  );
};

export default PackageInfo;
