import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-7">
      <div className="lg:col-span-4 border border-dark-15">
        <div className="px-4 md:px-8 lg:px-12 xl:ps-18 pt-10 pb-8 md:py-16 xl:pt-20">
          <h4 className="text-dark-40 text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
            Yarına Yolculuğunuz Burada Başlıyor
          </h4>

          <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl mt-3 mb-2">
            Yapay Zekanın Sınırlarını Keşfedin
          </h1>

          <p className="small-text">
            Yapay zeka inovasyonunun merkezine hoş geldiniz. FutureTech AI News, makinelerin düşündüğü, öğrendiği ve
            geleceği yeniden şekillendirdiği bir dünyaya açılan kapınız.
          </p>
        </div>

        <div className="grid grid-cols-3 border-t border-dark-15">
          <div className="border-r border-dark-15 p-5">
            <span className="flex items-center gap-1 text-xl md:text-2xl xl:text-3xl">
              300 <FaPlus className="text-yellow-55 scale-[0.7]" />
            </span>
            <span className="small-text">Kaynak Mevcut</span>
          </div>
          <div className="p-5">
            <span className="flex items-center gap-1 text-xl md:text-2xl xl:text-3xl">
              12k <FaPlus className="text-yellow-55 scale-[0.7]" />
            </span>
            <span className="small-text">İndirme</span>
          </div>
          <div className="border-l border-dark-15 p-5">
            <span className="flex items-center gap-1 text-xl md:text-2xl xl:text-3xl">
              10k <FaPlus className="text-yellow-55 scale-[0.7]" />
            </span>
            <span className="small-text">Aktif Kullanıcı</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 border border-dark-15 relative overflow-hidden h-full max-lg:min-h-[300px] flex items-end p-5 md:p-8 lg:p-12">
        <div className="absolute top-0 left-0">
          <img src="/sun.png" alt="sun" className="rotate-[30deg] scale-[1.2]  brightness-50" brightness-0 />
        </div>

        <div className="z-10">
          <h2 className="md:text-xl xl:text-2xl">1000+ Kaynağı Keşfedin</h2>

          <p className="small-text my-3">Gelişen teknoloji trendleri ve atılımlar hakkında 1000'den fazla makale.</p>

          <Button text="Kaynakları Keşfet" to="/" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
