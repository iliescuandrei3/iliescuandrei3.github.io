interface ExperienceItemProps {
  role: string;
  company: string;
  dates: string;
  location: string;
  description: string;
  src: string;
}

export function ExperienceItem({
  role,
  company,
  dates,
  location,
  description,
  src,
}: ExperienceItemProps) {
  return (
    <article className="experience-card">
      <div className="experience-card__topline">
        <div className="experience-card__identity">
          <div className="experience-card__mark">
            <img className="experience-card__image" src={src} alt={`${company} logo`} />
          </div>
          <div>
            <h3 className="experience-card__role">{role}</h3>
            <p className="experience-card__company">{company}</p>
          </div>
        </div>
        <div className="experience-card__meta">
          <p>{dates}</p>
          <p>{location}</p>
        </div>
      </div>
      <p className="experience-card__description">{description}</p>
    </article>
  );
}
