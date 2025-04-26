import React from "react";

const Error = ({ info, refetch }) => {
  return (
    <div className="flex flex-col">
      <div className="mt-40 bg-red-400 rounded-lg p-5 text-white text-lg text-center">
        <h1>Üzgünüz bir sorun oluştu</h1>
        <h1> {info} </h1>
      </div>

      <button
        className="btn rounded-lg mt-10 bg-blue-300 hover:bg-blue-400"
        onClick={refetch}
      >
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
