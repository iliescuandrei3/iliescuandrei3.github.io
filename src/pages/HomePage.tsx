import { Desktop } from "@/components/os/Desktop";
import { MobileShell } from "@/components/os/MobileShell";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HomePage() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileShell /> : <Desktop />;
}
