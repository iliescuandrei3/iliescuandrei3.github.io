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
    <Avatar size="xlg">
      <AvatarImage src={avatarImage.src} alt="@shadcn" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  )
}