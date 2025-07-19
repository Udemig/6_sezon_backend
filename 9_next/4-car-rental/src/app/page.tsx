import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import PopularCars from "@/components/PopularCars";
import RecommendedCars from "@/components/RecommendedCars";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <PopularCars />
      <RecommendedCars />
    </>
  );
}
