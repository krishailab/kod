import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { MissionSection } from "@/components/about/mission-section";
import { TeamSection } from "@/components/about/team-section";
import { ValuesSection } from "@/components/about/values-section";

export const metadata = {
  title: 'About - KodRish',
  description: 'Learn more about KodRish Innovation & Solutions.',
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <AboutHeroSection />
      <MissionSection />
      <TeamSection />
      <ValuesSection />
      <FooterSection />
    </main>
  );
}
