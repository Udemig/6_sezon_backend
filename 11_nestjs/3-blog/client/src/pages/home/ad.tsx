import Button from "../../components/button";

const Ad = () => {
  return (
    <div className="py-10 lg:py-15 xl:py-25 padding-x bg-dark-15 flex flex-col md:flex-row justify-between md:items-center gap-5">
      <div className="flex flex-col gap-4">
        <span className="bg-dark-20 px-4 py-2 w-fit rounded-md">Bilgi Hazinesi</span>

        <h1 className="text-2xl lg:text-3xl xl:text-4xl">FutureTech'in Detaylı Blog Yazılarını Keşfedin</h1>
      </div>

      <Button text="Blogları Görüntüle" to="/" className="max-md:w-full max-md:justify-center hover:bg-dark-20" />
    </div>
  );
};

export default Ad;
