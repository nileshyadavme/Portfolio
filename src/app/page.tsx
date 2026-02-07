import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Timeline } from "@/components/home/timeline";
import { Reads } from "@/components/home/reads";
import { Contact } from "@/components/home/contact";
import { ResumeSection } from "@/components/home/resume-section";
import { AchievementsPreview } from "@/components/home/achievements-preview";
import { MathBackground } from "@/components/background/math-background";
import { TechTicker } from "@/components/home/tech-ticker";

export default function Home() {
  return (
    <>
      <MathBackground />
      <Hero />
      <TechTicker />
      <Projects />
      <AchievementsPreview />
      <Timeline />
      <Reads />
      <Contact />
      <ResumeSection />
      {/* Other sections will go here */}
    </>
  );
}
