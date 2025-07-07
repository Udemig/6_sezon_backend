import { FC } from "react";

interface Props {
  mode: boolean;
}

const SubmitButton: FC<Props> = ({ mode }) => {
  return (
    <button className="bg-blue-600 mt-5 p-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[42px]">
      {mode ? "Kaydet" : "Oluştur"}
    </button>
  );
};

export default SubmitButton;
