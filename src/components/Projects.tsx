import { ProjectItem } from "./ProjectItem";
import { Separator } from "./ui/separator";
import avatarImage from "@/assets/avatar.jpg"

interface ProjectsProps {
}

export default function Projects({ }: ProjectsProps) {
  return <div className="section-shell">
    <h2 className="section-heading">Projects</h2>
    <Separator />
    <div className="projects-list">
      <ProjectItem
        name="Humphrey"
        category="WEB APP"
        tags={["JAVASCRIPT", "MONGO DB"]}
        description="some description"
        source={avatarImage.src}
        pageUrl="/humphrey"
        githubUrl="https://github.com/iliescuandrei3"
        projectUrl="https://github.com/iliescuandrei3"
      />
      <ProjectItem
        name="Humphrey"
        category="WEB APP"
        tags={["JAVASCRIPT", "MONGO DB"]}
        description="some description"
        source={avatarImage.src}
        pageUrl="/humphrey"
        githubUrl="https://github.com/iliescuandrei3"
        projectUrl="https://github.com/iliescuandrei3"
      />
      <ProjectItem
        name="Humphrey"
        category="WEB APP"
        tags={["JAVASCRIPT", "MONGO DB"]}
        description="some description"
        source={avatarImage.src}
        pageUrl="/humphrey"
        githubUrl="https://github.com/iliescuandrei3"
        projectUrl="https://github.com/iliescuandrei3"
      />
    </div>
  </div>
}