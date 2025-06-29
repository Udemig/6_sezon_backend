import delay from "@/utils/delay";
import { fetchRecipes } from "@/utils/service";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../dashboard/loading";

/*
* Sorun
* Bu sayfa normalde build anında bir kere oluşur ve giriş yapan  kullanıclar sürekli buil anında alınan tarfiler görür daha sonrasında yeni tarifler eklendiyse onları görüntüleyemez

* Çözüm
* Revalidate özelliği ile kaç saniyede bir sayfa içeriğinin statik olarak tetkrardan oluşturulavğını belirle
*/

//export const revalidate = 60;

// Eğer bir statik sayfayı tamamen dinamik hale getirmek isterseniz:
export const dynamic = "force-dynamic";

// Component'ı asenkron yap ve api isteğini içerisinde at
const Recipes = async () => {
  return (
    <div className="p-10 border border-blue-500">
      <h1 className="text-4xl font-bold">Tarifler</h1>

      <Suspense fallback={<Loading />}>
        <RecipeList />
      </Suspense>
    </div>
  );
};

const RecipeList = async () => {
  await delay(3000);
  const data = await fetchRecipes();

  return data.recipes.map((item) => (
    <Link href={`/recipes/${item.id}`} key={item.id} className="flex gap-4 mt-5 p-4 rounded-md border">
      <Image src={item.image} alt={item.name} width={150} height={150} />
      <div>
        <h1>{item.name}</h1>
        <h2>{item.cuisine}</h2>
      </div>
    </Link>
  ));
};

export default Recipes;
