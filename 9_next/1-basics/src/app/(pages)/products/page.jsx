import Link from "next/link";

export const metadata = {
  title: "Products",
};

const Products = () => {
  return (
    <div>
      <h1>Products Sayfassı</h1>

      <ul className="flex flex-col gap-4 text-2xl my-10">
        <Link href="/products/1">Ürün - 1</Link>
        <Link href="/products/2">Ürün - 2</Link>
        <Link href="/products/3">Ürün - 3</Link>
        <Link href="/products/4">Ürün - 4</Link>
        <Link href="/products/5">Ürün - 5</Link>
      </ul>
    </div>
  );
};

export default Products;
