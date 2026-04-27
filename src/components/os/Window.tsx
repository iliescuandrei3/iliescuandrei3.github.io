import { useEffect, useRef, useState } from "react";
import { useWindowStore, type WindowState } from "@/stores/windowStore";
import { getApp } from "@/apps/registry";
import { PlaceholderApp } from "@/apps/placeholder";

const MIN_W = 320;
const MIN_H = 220;
const MENU_BAR_H = 28;

type ResizeDir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function Window({ win }: { win: WindowState }) {
  const focus = useWindowStore((s) => s.focusWindow);
  const close = useWindowStore((s) => s.closeWindow);
  const minimize = useWindowStore((s) => s.minimizeWindow);
  const toggleMax = useWindowStore((s) => s.toggleMaximize);
  const move = useWindowStore((s) => s.moveWindow);
  const resize = useWindowStore((s) => s.resizeWindow);

  const [opening, setOpening] = useState(true);
  useEffect(() => {
    const t = requestAnimationFrame(() => setOpening(false));
    return () => cancelAnimationFrame(t);
  }, []);

  const dragRef = useRef<{ ox: number; oy: number; sx: number; sy: number } | null>(null);
  const resizeRef = useRef<{
    dir: ResizeDir;
    sx: number;
    sy: number;
    ox: number;
    oy: number;
    ow: number;
    oh: number;
  } | null>(null);

  const onTitleDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-traffic]")) return;
    focus(win.id);
    if (win.maximized) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { ox: win.x, oy: win.y, sx: e.clientX, sy: e.clientY };
  };
  const onTitleMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    const nx = dragRef.current.ox + dx;
    const ny = Math.max(MENU_BAR_H, dragRef.current.oy + dy);
    move(win.id, nx, ny);
  };
  const onTitleUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const startResize = (dir: ResizeDir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    focus(win.id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    resizeRef.current = {
      dir,
      sx: e.clientX,
      sy: e.clientY,
      ox: win.x,
      oy: win.y,
      ow: win.width,
      oh: win.height,
    };
  };
  const onResizeMove = (e: React.PointerEvent) => {
    const r = resizeRef.current;
    if (!r) return;
    const dx = e.clientX - r.sx;
    const dy = e.clientY - r.sy;
    let { ox: x, oy: y, ow: width, oh: height } = r;
    if (r.dir.includes("e")) width = Math.max(MIN_W, r.ow + dx);
    if (r.dir.includes("s")) height = Math.max(MIN_H, r.oh + dy);
    if (r.dir.includes("w")) {
      const w = Math.max(MIN_W, r.ow - dx);
      x = r.ox + (r.ow - w);
      width = w;
    }
    if (r.dir.includes("n")) {
      const h = Math.max(MIN_H, r.oh - dy);
      y = Math.max(MENU_BAR_H, r.oy + (r.oh - h));
      height = h;
    }
    resize(win.id, { x, y, width, height });
  };
  const endResize = (e: React.PointerEvent) => {
    resizeRef.current = null;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const app = getApp(win.appId);
  const Body = app?.component;

  return (
    <div
      onPointerDown={() => focus(win.id)}
      className={`absolute flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[var(--window-bg)] text-foreground shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-[opacity,transform] duration-200 ${
        opening ? "scale-95 opacity-0" : "scale-100 opacity-100"
      } ${win.minimized ? "pointer-events-none scale-50 opacity-0" : ""}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }}
    >
      {/* Title bar */}
      <div
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onDoubleClick={() =>
          toggleMax(win.id, { width: window.innerWidth, height: window.innerHeight })
        }
        className="relative flex h-9 shrink-0 items-center justify-center border-b border-white/10 bg-white/5 px-3 select-none"
        style={{ cursor: dragRef.current ? "grabbing" : "grab" }}
      >
        <div data-traffic className="absolute left-3 flex items-center gap-2">
          <button
            onClick={() => close(win.id)}
            className="group/tl flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] ring-1 ring-black/10 hover:brightness-110"
            aria-label="Close"
          >
            <svg className="h-2 w-2 opacity-0 group-hover/tl:opacity-70" viewBox="0 0 10 10">
              <path d="M2 2 L8 8 M8 2 L2 8" stroke="#4d0000" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => minimize(win.id)}
            className="group/tl flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] ring-1 ring-black/10 hover:brightness-110"
            aria-label="Minimize"
          >
            <svg className="h-2 w-2 opacity-0 group-hover/tl:opacity-70" viewBox="0 0 10 10">
              <path d="M2 5 L8 5" stroke="#5a3a00" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() =>
              toggleMax(win.id, { width: window.innerWidth, height: window.innerHeight })
            }
            className="group/tl flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] ring-1 ring-black/10 hover:brightness-110"
            aria-label="Maximize"
          >
            <svg className="h-2 w-2 opacity-0 group-hover/tl:opacity-70" viewBox="0 0 10 10">
              <path d="M3 3 L3 7 L7 7 Z M7 7 L7 3 L3 3 Z" fill="#003d00" />
            </svg>
          </button>
        </div>
        <div className="text-xs font-semibold text-foreground/80">{win.title}</div>
      </div>

      {/* Body */}
      <div className="relative flex-1 overflow-auto bg-[var(--window-body)]">
        {Body ? <Body /> : <PlaceholderApp name={win.title} />}
      </div>

      {/* Resize handles */}
      {!win.maximized && (
        <>
          <div onPointerDown={startResize("n")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute inset-x-2 top-0 h-1.5 cursor-n-resize" />
          <div onPointerDown={startResize("s")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute inset-x-2 bottom-0 h-1.5 cursor-s-resize" />
          <div onPointerDown={startResize("w")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute inset-y-2 left-0 w-1.5 cursor-w-resize" />
          <div onPointerDown={startResize("e")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute inset-y-2 right-0 w-1.5 cursor-e-resize" />
          <div onPointerDown={startResize("nw")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute left-0 top-0 h-3 w-3 cursor-nw-resize" />
          <div onPointerDown={startResize("ne")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute right-0 top-0 h-3 w-3 cursor-ne-resize" />
          <div onPointerDown={startResize("sw")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute bottom-0 left-0 h-3 w-3 cursor-sw-resize" />
          <div onPointerDown={startResize("se")} onPointerMove={onResizeMove} onPointerUp={endResize}
            className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize" />
        </>
      )}
    </div>
  );
}
