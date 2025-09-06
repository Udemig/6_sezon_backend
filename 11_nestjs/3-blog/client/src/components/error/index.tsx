import type { FC } from "react";

interface Props {
  message: string;
}

const Error: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-10">
      <h1>Üzgünüz, bir hata oluştu.</h1>
      <h2 className="text-red-600">{message}</h2>
    </div>
  );
};

export default Error;
