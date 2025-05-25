import type { FormEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const text = e.currentTarget.search.value;

    if (!text.trim()) return;

    navigate(`/search?query=${text.trim()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex border rounded overflow-hidden max-w-[500px] border-zinc-300">
      <input
        name="search"
        type="text"
        placeholder="hizmet ara...."
        className="w-full h-full px-3 py-1 outline-none"
        defaultValue={searchParams.get("query") || ""}
      />

      <button
        type="submit"
        className="bg-black p-2 text-white text-xl cursor-pointer hover:brightness-75 transition max-sm:hidden"
      >
        <IoSearch />
      </button>
    </form>
  );
};

export default Form;
