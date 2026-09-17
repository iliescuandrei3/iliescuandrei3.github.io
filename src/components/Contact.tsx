import { Button } from "./ui/button";
import { LinkedinIcon } from "./icons/il-linkedin";
import { GithubIcon } from "./icons/lucide-github";
import { MailIcon } from "./icons/lucide-mail";
interface ContactProps {
}

export default function Contact({ }: ContactProps) {
    return <div className="flex flex-col items-center gap-1 pt-6">
      <Button
        variant="link"
        size="lg"
        render={
          <a
            href="https://github.com/iliescuandrei3"
            target="_blank"
            rel="noreferrer"
          />
        }
      >
        <GithubIcon />
        GitHub
      </Button>

      <Button
        variant="link"
        render={
          <a
            href="https://www.linkedin.com/in/andrei-iliescu-a76558223/"
            target="_blank"
            rel="noreferrer"
          />
        }
      >
        <LinkedinIcon />
        LinkedIn
      </Button>
        {/* TODO */}
      <Button variant="link" render={<a href="mailto:you@example.com" />}>
        <MailIcon/>
        Email
      </Button>
    </div>
}