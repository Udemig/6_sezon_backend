// Api isteğini atan fonksiyonu hazırla
export const fetchRecipes = async () => {
  const res = await fetch("https://dummyjson.com/recipes", {
    cache: "default", // cache ayarlarını yapabiliyoruz
  });

  return res.json();
};

export const fetchRecipeById = async (id) => {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
    cache: "default", // cache ayarlarını yapabiliyoruz
  });

  return res.json();
};
