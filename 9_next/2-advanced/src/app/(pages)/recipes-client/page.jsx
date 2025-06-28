"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yükleniyor....</p>;

  if (error) return <p>Hata: {error}!!</p>;

  return (
    <div className="p-10 border border-red-500">
      <h1 className="text-4xl font-bold">Tarifler</h1>

      {recipes.map((item) => (
        <div key={item.id} className="flex gap-4 mt-5 p-4 rounded-md border">
          <Image src={item.image} alt={item.name} width={150} height={150} />
          <div>
            <h1>{item.name}</h1>
            <h2>{item.cuisine}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
