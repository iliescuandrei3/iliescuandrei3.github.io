import { Separator } from "./ui/separator";

interface BioProps {
    content: string;
}

export default function Bio({ content }: BioProps) {
    return <div className="typeset typeset-article">
        <h2>Bio</h2>
        <Separator/>
        <p>{content}</p>
    </div>
}