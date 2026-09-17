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
      </div>
    </section>
  );
}