import { Separator } from "./ui/separator";

interface BioProps {
  content?: string;
}

export default function Bio({ content }: BioProps) {
  return (
    <section className="section-shell intro-bio">
      <h2 className="section-heading">Bio</h2>
      <Separator />
      <p className="text-base leading-relaxed text-muted-foreground">{content}</p>
    </section>
  )
}