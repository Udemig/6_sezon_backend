import Link from "next/link";

const Comp2 = () => {
  return (
    <div className="text-center">
      <h1 className="mb-10">
        <b> Comp-2 </b>
        Görüntüleniyor
      </h1>

      <Link href="/comp1" className="text-blue-500 text-lg">
        Comp-1'e Dön
      </Link>
    </div>
  );
};

export default Comp2;
