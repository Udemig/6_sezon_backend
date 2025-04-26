import { CiSearch } from "react-icons/ci";

const Search = ({ setSearchTerm }) => {
  return (
    <section className="bg-white flex gap-3 p-3 rounded-lg overflow-hidden items-center shadow-lg">
      <CiSearch className="text-xl" />

      <input
        type="text"
        className="w-full outline-none text-zinc-700"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </section>
  );
};

export default Search;
