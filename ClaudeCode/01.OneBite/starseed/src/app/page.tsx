import Hero from "@/components/sections/Hero";
import CosmicMessage from "@/components/sections/CosmicMessage";
import MainMenu from "@/components/sections/MainMenu";
import RecommendedFor from "@/components/sections/RecommendedFor";
import ResultPreview from "@/components/sections/ResultPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <CosmicMessage />
      <MainMenu />
      <RecommendedFor />
      <ResultPreview />
    </>
  );
}
