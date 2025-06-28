"use client";

import Card from "./card";

const About = () => {
  return (
    <div className="p-10 text-3xl text-center my-10 border border-red-500">
      <h1 className="font-bold">Hakkımızda Sayfası</h1>

      <ul>
        <li>Selam</li>
        <li>Naber</li>
        <li>Nasılsın</li>
      </ul>

      {/* Normalde server component ama client component içerisinde kullanıldığı için client tarafında render edilir */}
      <Card />

      <span className="client">Client Component (CSR)</span>
    </div>
  );
};

export default About;
