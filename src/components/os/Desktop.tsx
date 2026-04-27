import { AuroraBackground } from "./AuroraBackground";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WindowManager } from "./WindowManager";
import { useWindowStore } from "@/stores/windowStore";

export function Desktop() {
  const windows = useWindowStore((s) => s.windows);
  const top = Object.values(windows)
    .filter((w) => !w.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AuroraBackground />
      <MenuBar activeTitle={top?.title} />
      <WindowManager />
      <Dock />
    </div>
  );
}
