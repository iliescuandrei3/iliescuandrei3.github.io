import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import avatarImage from "@/assets/avatar.jpg"

interface ProfileProps {
}

export default function Profile({ }: ProfileProps) {
  return (
    <Avatar className="size-[clamp(12rem,28vw,16.25rem)] border-4">
      <AvatarImage src={avatarImage.src} alt="Andrei Iliescu" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  )
}