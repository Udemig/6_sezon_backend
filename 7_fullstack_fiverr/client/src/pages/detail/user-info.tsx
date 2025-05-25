import type { FC } from "react";
import type { IUser } from "../../types";
import Rating from "../../components/card/rating";
import { PiStarFourFill, PiVideoCamera } from "react-icons/pi";

interface Props {
  user: IUser;
}

const UserInfo: FC<Props> = ({ user }) => {
  return (
    <div>
      <h1 className="font-bold text-xl mt-10 mb-3">{user.username}'i tanıyalım</h1>

      <div className="flex flex-col items-center gap-3">
        <img src={user.profilePicture} alt={user.username} className="size-28 rounded-full object-cover" />

        <h4 className="font-semibold">{user.username}</h4>

        <p className="text-gray-600 font-[300] text-center">{user.description}</p>

        <div className="flex gap-5">
          <Rating rating={4.3} reviews={912} />

          <div className="flex items-center bg-orange-500/40 py-1 px-2 rounded-md">
            <span className="text-sm pe-1">Top Rated </span>

            <PiStarFourFill />
            <PiStarFourFill />
            <PiStarFourFill />
          </div>
        </div>
      </div>

      <div className="flex gap-8 mt-5 font-semibold">
        <button className="py-2 px-5 border rounded-md hover:bg-zinc-200 transition cursor-pointer">
          İletişime Geç
        </button>
        <button className="py-2 px-5 border rounded-md flex  gap-2 items-center hover:bg-zinc-200 transition cursor-pointer">
          <PiVideoCamera />
          Toplantı Ayarla
        </button>
      </div>

      <div className="border border-zinc-300 my-10 p-5 grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Nereden</span>
          <span className="text-zinc-700 font-semibold">{user.country}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Üyelik Tarihi</span>
          <span className="text-zinc-700 font-semibold">{user.createdAt}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Telefon</span>
          <span className="text-zinc-700 font-semibold">{user.phone}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Mail</span>
          <span className="text-zinc-700 font-semibold">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
