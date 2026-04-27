import Nav from "@/components/scorlink/Nav";
import Hero from "@/components/scorlink/Hero";
import BigStat from "@/components/scorlink/BigStat";
import Facts from "@/components/scorlink/Facts";
import How from "@/components/scorlink/How";
import Fomo from "@/components/scorlink/Fomo";
import Pricing from "@/components/scorlink/Pricing";
import FinalCta from "@/components/scorlink/FinalCta";
import Footer from "@/components/scorlink/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-cream text-bordeaux">
      <Nav />
      <Hero />
      <BigStat />
      <Facts />
      <How />
      <Fomo />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
};

export default Index;
