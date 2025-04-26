import Select from "react-select/creatable";
import { Link } from "react-router-dom";
import { useState } from "react";

const Form = ({ isLoading, mutate, recipeData }) => {
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //bütün inputlarda ki verilere obje formatında eriş
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    //adımları "," e göre diziye çevir
    newRecipe.instructions = newRecipe.instructions.split(",");

    //malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    //api isteği at
    mutate(newRecipe);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto"
    >
      <Field label="Başlık">
        <input
          className="inp"
          name="recipeName"
          required
          defaultValue={recipeData?.recipeName}
        />
      </Field>

      <Field label="Kategori">
        <input
          className="inp"
          name="category"
          required
          defaultValue={recipeData?.category}
        />
      </Field>

      <Field label="Süre">
        <input
          className="inp"
          name="recipeTime"
          required
          defaultValue={recipeData?.recipeTime}
        />
      </Field>

      <Field label="Malzemeler">
        <Select
          isMulti
          value={ingredients.map((i) => ({ value: i, label: i }))}
          onChange={(options) =>
            setIngredients(options.map((opt) => opt.value))
          }
        />
      </Field>

      <Field label="Tarif Adımları (, ile ayırınız)">
        <textarea
          className="inp min-h-[80px] max-h-[300px] "
          name="instructions"
          required
          defaultValue={recipeData?.instructions}
        ></textarea>
      </Field>

      <Field label="Sunum Önerisi">
        <textarea
          className="inp min-h-[80px] max-h-[200px] "
          name="servingSuggestion"
          defaultValue={recipeData?.servingSuggestion}
        ></textarea>
      </Field>

      <div className="flex justify-end gap-6">
        <Link to="/" className="btn">
          Geri
        </Link>

        <button
          disabled={isLoading}
          className="btn bg-red-400 hover:bg-red-500"
          type="submit"
        >
          {recipeData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};

export default Form;

//HOC -Higher Order Components

const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label> {label} </label>

      {children}
    </div>
  );
};
