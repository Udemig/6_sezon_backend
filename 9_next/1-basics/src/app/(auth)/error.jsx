"use client";

// Hata component aldığı proplar
// error: hata detayları
// reset: tekrar denemeye yarayan fonksiyon
const Error = ({ error, reset }) => {
  return (
    <div className="text-xl text-red-500 flex flex-col gap-5 text-center">
      <h1>Üzgünüz Bir sorun oluştu</h1>

      <p>{error.message}</p>

      <button onClick={reset}>Tekrar Dene</button>
    </div>
  );
};

export default Error;
