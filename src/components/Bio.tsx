import Markdown from "react-markdown";

interface BioProps {
  content?: string;
}

export default function Bio({ content }: BioProps) {
  return (
    <section className="section-shell intro-bio">
      <div className="text-base leading-relaxed text-muted-foreground">
        <Markdown>{content}</Markdown>
      </div>
    </section>
  );
}