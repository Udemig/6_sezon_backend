import { fetchRecipes } from "@/utils/service";
import Link from "next/link";
import NavLink from "./navlink";

const Header = async () => {
  const data = await fetchRecipes();

  return (
    <header className="px-10 py-5 border border-b-2 flex justify-between">
      <h2>Next</h2>

      <nav className="flex gap-5">
        <NavLink href="/">Anasayfa</NavLink>
        <NavLink href="/recipes">Tarifler ({data.recipes.length})</NavLink>
      </nav>
    </header>
  );
};

export default Header;
