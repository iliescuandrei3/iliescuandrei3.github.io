import type { CollectionEntry } from "astro:content";
import { ProjectItem } from "./ProjectItem";
import { Separator } from "./ui/separator";

interface ProjectsProps {
  projects: CollectionEntry<"projects">[]
}

export default function Projects({ projects }: ProjectsProps) {
  return <div className="section-shell my-30">
    <h2 className="section-heading">Projects</h2>
    <Separator />
    <div className="projects-list">
      {projects.map((project) => (
        <ProjectItem
          name={project.data.name}
          category={project.data.category}
          tags={project.data.tags}
          summary={project.data.summary}
          image={project.data.image}
          pageUrl={`projects/${project.id}`}
          githubUrl={project.data.githubUrl}
          projectUrl={project.data.projectUrl}
        />
      ))}
    </div>
  </div>
}