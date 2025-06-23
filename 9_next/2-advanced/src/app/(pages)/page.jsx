import Image from "next/image";
import localImage from "../../assets/sea.jpg";

const Home = () => {
  const remoteUrl =
    "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?_gl=1*1h92zo7*_ga*MTczNjA5NzU2Mi4xNzQ0NDg2MDE1*_ga_8JE65Q40S6*czE3NTA1ODk4OTIkbzckZzEkdDE3NTA1ODk5ODgkajI0JGwwJGgw";

  return (
    <div className="h-full grid place-items-center gap-10">
      <div>
        <h1>Local Resim (Unoptimized)</h1>
        <Image src={localImage} alt="sea and sun" unoptimized />
      </div>

      <div>
        <h1>Local Resim (Quality %50)</h1>
        <Image src={localImage} alt="sea and sun" quality={99} placeholder="blur" priority />
      </div>

      <div>
        <h1>Remote Resim (Url İle)</h1>
        <Image src={remoteUrl} alt="doğa manzarası" width={1920} height={1080} />
      </div>

      <div className="w-full">
        <h1>Remote Resim (Full Genişlik)</h1>

        <div className="h-[500px]  relative">
          <Image src={remoteUrl} alt="doğa manzarası" fill />
        </div>
      </div>
    </div>
  );
};

export default Home;
