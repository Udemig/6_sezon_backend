const reqFields = [
  "recipeName",
  "category",
  "recipeTime",
  "servingSuggestion",
  "ingredients",
  "instructions",
];

//nesnede ki değişkenlerin en az 1'i bile eksikse true
//hepsi tamamsa false döndürür

const isInValid = (data) => {
  return reqFields.some((field) => !data[field]);
};

export default isInValid;
