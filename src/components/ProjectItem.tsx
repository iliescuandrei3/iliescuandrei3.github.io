// import { Badge } from "@/components/ui/badge"
import { Badge } from "./ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GithubIcon } from "@/components/icons/lucide-github"
import { cn } from "@/lib/utils"
import { LinkIcon } from "./icons/heroicons-link"

interface ProjectItemProps {
  name: string;
  description: string;
  source: string;
  category: string;
  tags: string[];
  pageUrl: string;
  githubUrl?: string;
  projectUrl?: string;
}

export function ProjectItem({
  name,
  description,
  source,
  category,
  tags,
  pageUrl,
  githubUrl,
  projectUrl,
}: ProjectItemProps) {
  return (
    <Card className="project-card">
      <img
        src={source}
        alt={`${name} project preview`}
        className="aspect-video w-full object-cover"
      />
      <CardHeader className="project-card__header">
        <p className="project-card__category">
          {category}
        </p>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="project-card__title">{name}</CardTitle>
          <div className="project-card__links">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                className="project-card__icon-link"
              >
                <GithubIcon size={18} />
              </a>
            )}
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                className="project-card__icon-link"
              >
                <LinkIcon size={18} />
              </a>
            )}
          </div>
        </div>
        <div className="project-card__tags">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="project-card__tag">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="project-card__description">{description}</p>
        {pageUrl && (
          <a
            href={pageUrl}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "project-card__cta")}
          >
            Read more
          </a>
        )}
      </CardHeader>
    </Card>
  )
}
