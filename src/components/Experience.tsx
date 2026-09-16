import { ExperienceItem } from "./ExperienceItem";
import { Separator } from "./ui/separator";
import { type CollectionEntry } from "astro:content";

interface ExperienceProps {
  experiences: CollectionEntry<"experience">[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="section-shell flex flex-col gap-4">
      <h2 className="section-heading">Experience</h2>
      <Separator />
      <div className="experience-list">
        {experiences.map((experience) => (
          <ExperienceItem
            role={experience.data.role}
            company={experience.data.company}
            startDate={experience.data.startDate}
            endDate={experience.data.endDate}
            location={experience.data.location}
            logo={experience.data.logo}
            description={experience.body ?? ""}
          />
        ))}
        {/* <ExperienceItem
          role="Master Thesis Intern"
          company="Electronic Arts"
          dates="January 2026 - June 2026"
          location="Stockholm, Sweden"
          src={eaLogo.src}
          description="Accelerating and enhancing the capabilities of the Amazon Ads programmatic ad reporting platforms."
        />
        <ExperienceItem
          role="Machine Learning Intern"
          company="Filed"
          dates="June 2025 - August 2025"
          location="Stockholm, Sweden"
          src={filedLogo.src}
          description="Developing internal data tooling and infrastructure for scientists and ML researchers to accelerate genome research and analysis."
        />
        <ExperienceItem
          role="Software Engineer"
          company="Garmin"
          dates="July 2023 - August 2024"
          location="Cluj-Napoca, Romania"
          src={garminLogo.src}
          description="Developing internal data tooling and infrastructure for scientists and ML researchers to accelerate genome research and analysis."
        /> */}
      </div>
    </section>
  );
}