import delay from "@/utils/delay";
import { fetchRecipeById, fetchRecipes } from "@/utils/service";
import Image from "next/image";
import Link from "next/link";

export const generateStaticParams = async () => {
  // api'dan ürün verlierini al
  const data = await fetchRecipes();

  // hangi ürünler için detay sayfasının önceden hazırlanıcığını belirle
  return data.recipes.map((i) => ({ id: String(i.id) }));
};

const Page = async ({ params }) => {
  const { id } = await params;

  await delay(3000);
  const recipe = await fetchRecipeById(id);

  return (
    <div className="h-[80vh] flex items-center flex-col gap-5 justify-center">
      <Link href="/recipes" className="border p-2 rounded-md">
        Geri
      </Link>

      <Image src={recipe.image} alt={recipe.name} width={200} height={200} />

      <h1>{recipe.name}</h1>
      <h1>Mutfak: {recipe.cuisine}</h1>
      <h1>Zorluk: {recipe.difficulty}</h1>
    </div>
  );
};

export default Page;
