import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-6 bg-zinc-900 border-b border-zinc-800 animate-pulse">
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
      <div className="bg-gray-500/20  p-3 rounded-lg">
        <div className="text-2xl font-bold text-transparent">.</div>
        <div className="text-xs  text-transparent">.</div>
      </div>
    </div>
  );
};

export default Loading;
