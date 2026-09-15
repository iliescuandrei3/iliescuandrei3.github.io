import { Separator } from "./ui/separator";

interface ProjectsProps {
}

export default function Projects({ }: ProjectsProps) {
    return <div className="typeset typeset-article">
        <h2>Projects</h2>
        <Separator/>
        <p>all the projects</p>
    </div>
}