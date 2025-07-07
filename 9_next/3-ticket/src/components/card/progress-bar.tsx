import { FC } from "react";

interface Props {
  progress: number;
}

const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>İlerleme</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          style={{ width: `${progress}%` }}
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition duration-500"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
