import ReactMarkdown from "react-markdown";

interface ExperienceItemProps {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  logo: string;
}

export async function ExperienceItem({
  role,
  company,
  startDate,
  endDate,
  location,
  description,
  logo,
}: ExperienceItemProps) {
  return (
    <article className="experience-card">
      <div className="experience-card__topline">
        <div className="experience-card__identity">
          <div className="experience-card__mark">
            <img className="experience-card__image" src={logo} alt={`${company} logo`} />
          </div>
          <div>
            <h3 className="experience-card__role">{role}</h3>
            <p className="experience-card__company">{company}</p>
          </div>
        </div>
        <div className="experience-card__meta">
          <p>{startDate} - {endDate}</p>
          <p>{location}</p>
        </div>
      </div>
      <div className="experience-card__description typeset typeset-article">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </article>
  );
}
