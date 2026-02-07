import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Timeline } from "@/components/home/timeline";
import { Reads } from "@/components/home/reads";
import { Contact } from "@/components/home/contact";
import { ResumeSection } from "@/components/home/resume-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Timeline />
      <Reads />
      <Contact />
      <ResumeSection />
      {/* Other sections will go here */}
    </>
  );
}
