import type { FC, FormEvent } from "react";
import { categories, inputs } from "../../utils/constants";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import { useCreateGig } from "../../service/gig";
import Loader from "../../components/loader";

const AddGig: FC = () => {
  // mutasyon kurulumu
  const { mutate, isPending } = useCreateGig();

  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // inptulardaki verileri al
    const gigData = new FormData(e.currentTarget);

    // api'a oluşturma isteği at
    mutate(gigData);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">Yeni Hizmet Oluştur</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-x-10">
          {inputs.map((input, key) => (
            <Input {...input} key={key} />
          ))}

          <Select label="Kategori" options={categories} name="category" />
        </div>

        <div className="flex md:justify-center my-5">
          <button
            className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2 flex justify-center disabled:opacity-80 cursor-pointer h-9"
            disabled={isPending}
          >
            {isPending ? <Loader designs="text-lg text-white" /> : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
