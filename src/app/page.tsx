import { Hero } from "@/components/home/hero";
import { SignatureTreatments } from "@/components/home/signature-treatments";
import { HouseStory } from "@/components/home/house-story";
import { GuestWords } from "@/components/home/guest-words";
import { VisitCard } from "@/components/home/visit-card";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureTreatments />
      <HouseStory />
      <GuestWords />
      <VisitCard />
    </>
  );
}
