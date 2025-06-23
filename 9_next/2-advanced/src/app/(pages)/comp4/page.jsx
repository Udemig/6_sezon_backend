import Link from "next/link";

const Comp4 = () => {
  return (
    <div className="text-center">
      <h1 className="mb-10">
        <b> Comp-4 </b>
        Görüntüleniyor
      </h1>

      <Link href="/comp3" className="text-blue-500 text-lg">
        Comp-3'ye Git
      </Link>
    </div>
  );
};

export default Comp4;
