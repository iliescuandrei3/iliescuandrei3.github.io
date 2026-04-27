import { useState } from "react";
import { X } from "lucide-react";
import { APPS, getApp } from "@/apps/registry";
import { AuroraBackground } from "./AuroraBackground";

export function MobileShell() {
  const [openId, setOpenId] = useState<string | null>(null);
  const app = openId ? getApp(openId) : null;
  const Body = app?.component;

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <AuroraBackground />

      {/* Home grid */}
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 pt-12 pb-32">
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {APPS.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  onClick={() => setOpenId(a.id)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${a.iconBg} shadow-lg ring-1 ring-white/20`}
                  >
                    <Icon className="h-7 w-7 text-white drop-shadow" />
                  </div>
                  <span className="text-[11px] font-medium text-white drop-shadow">{a.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Home indicator */}
        <div className="pb-2 flex justify-center">
          <div className="h-1 w-32 rounded-full bg-white/70" />
        </div>
      </div>

      {/* Fullscreen app */}
      {app && Body && (
        <div className="absolute inset-0 z-50 flex flex-col bg-[var(--window-body)] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-white/5 px-4 backdrop-blur-xl">
            <span className="text-sm font-semibold">{app.name}</span>
            <button
              onClick={() => setOpenId(null)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 hover:bg-black/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <Body />
          </div>
        </div>
      )}
    </div>
  );
}
