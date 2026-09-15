import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface UsernameProps {
	username: string;
}


export default function Username({ username }: UsernameProps) {
	return (
		<div className="typeset typeset-article text-4xl pb-15">
			<HoverCard>
				<HoverCardTrigger delay={10} closeDelay={100} render={<h1>{username}</h1>} />
				<HoverCardContent className="flex w-64 flex-col gap-0.5">
					<div className="font-semibold">@nextjs</div>
					<div>The React Framework - created and maintained by @vercel.</div>
					<div className="mt-1 text-xs text-muted-foreground">
					Joined December 2021
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
//   )
	);
}
