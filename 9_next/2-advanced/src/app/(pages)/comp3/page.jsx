import Link from "next/link";

const Comp3 = () => {
  return (
    <div className="text-center">
      <h1 className="mb-10">
        <b> Comp-3 </b>
        Görüntüleniyor
      </h1>

      <Link href="/comp4" className="text-blue-500 text-lg">
        Comp-4'ye Git
      </Link>
    </div>
  );
};

export default Comp3;
