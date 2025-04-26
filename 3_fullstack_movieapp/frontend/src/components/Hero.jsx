import React from "react";

const Hero = () => {
  return (
    <div className="px-10 py-20 lg:px-20 bg-[linear-gradient(#00000071,#00000071),url('silo.jpeg')] bg-cover bg-center text-white">
      <h1 className="text-4xl md:text-5xl">Hoşgeldin</h1>
      <h1 className="text-xl md:tex-2xl font-semibold">
        Milyonlarca Film, Dizi ve Aktörleri Keşfet
      </h1>
      <div className="rounded-lg overflow-hidden flex mt-5">
        <input
          type="text"
          placeholder="Film, Dizi ,Aktör arayın"
          className="w-full py-2 px-4 text-black"
        />

        <button className="bg-blue-500 px-5 font-semibold hover:bg-blue-600 ">
          Ara
        </button>
      </div>
    </div>
  );
};

export default Hero;
