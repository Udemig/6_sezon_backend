import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import PopularCars from "@/components/PopularCars";
import RecommendedCars from "@/components/RecommendedCars";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchSection />
      <PopularCars />
      <RecommendedCars />
      <Footer />
    </div>
  );
}
