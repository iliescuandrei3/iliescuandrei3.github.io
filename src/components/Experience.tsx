import { ExperienceItem } from "./ExperienceItem";
import { Separator } from "./ui/separator";
import { type CollectionEntry } from "astro:content";

interface ExperienceProps {
  experiences: CollectionEntry<"experience">[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="section-shell">
      <h2 className="section-heading">Work</h2>
      <Separator />
      <div className="experience-list">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            role={experience.data.role}
            company={experience.data.company}
            startDate={experience.data.startDate}
            endDate={experience.data.endDate}
            location={experience.data.location}
            logo={experience.data.logo}
            description={experience.body ?? ""}
          />
        ))}
      </div>
    </section>
  );
}