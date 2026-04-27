import { useEffect, useState } from "react";
import { Apple } from "lucide-react";

export function MenuBar({ activeTitle }: { activeTitle?: string }) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <div className="absolute inset-x-0 top-0 z-[10000] flex h-7 items-center justify-between px-4 text-xs font-medium text-white/90 backdrop-blur-xl bg-black/20 border-b border-white/5">
      <div className="flex items-center gap-4">
        <Apple className="h-3.5 w-3.5" />
        <span className="font-semibold">{activeTitle || "Portfolio"}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="tabular-nums">{time}</span>
      </div>
    </div>
  );
}
