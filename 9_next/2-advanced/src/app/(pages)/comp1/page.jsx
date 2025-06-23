import Link from "next/link";

const Comp1 = () => {
  return (
    <div className="text-center">
      <h1 className="mb-10">
        <b> Comp-1 </b>
        Görüntüleniyor
      </h1>

      <Link href="/comp1/comp2" className="text-blue-500 text-lg">
        Comp-2'ye Git
      </Link>
    </div>
  );
};

export default Comp1;
