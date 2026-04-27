import { useRef, useState } from "react";
import { APPS } from "@/apps/registry";
import { useWindowStore } from "@/stores/windowStore";

const BASE = 52;
const MAX = 78;
const RANGE = 110;

export function Dock() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const order = useWindowStore((s) => s.order);
  const windows = useWindowStore((s) => s.windows);
  const openApp = useWindowStore((s) => s.openApp);

  const handleClick = (id: string, name: string) => {
    const existing = Object.values(windows).find((w) => w.appId === id);
    if (existing) {
      openApp(id, name); // store handles focus/restore
    } else {
      openApp(id, name);
    }
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[9999] flex justify-center">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          setMouseX(e.clientX - r.left);
        }}
        onMouseLeave={() => setMouseX(null)}
        className="pointer-events-auto flex items-end gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 shadow-2xl backdrop-blur-2xl"
        style={{ minHeight: BASE + 24 }}
      >
        {APPS.map((app, i) => {
          // compute icon center if we know mouseX
          let size = BASE;
          if (mouseX !== null && ref.current) {
            const iconCenter = 12 + i * (BASE + 8) + BASE / 2;
            const dist = Math.abs(mouseX - iconCenter);
            if (dist < RANGE) {
              const t = 1 - dist / RANGE;
              size = BASE + (MAX - BASE) * t;
            }
          }
          const isOpen = order.includes(app.id);
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => handleClick(app.id, app.name)}
              className="group relative flex flex-col items-center justify-end transition-transform"
              style={{ width: size, height: size }}
              title={app.name}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br ${app.iconBg} shadow-lg ring-1 ring-white/20 transition-all`}
              >
                <Icon className="h-1/2 w-1/2 text-white drop-shadow" />
              </div>
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                {app.name}
              </span>
              <span
                className={`absolute -bottom-1.5 h-1 w-1 rounded-full bg-white/90 transition-opacity ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
