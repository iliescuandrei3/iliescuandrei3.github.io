import { create } from "zustand";

export type WindowState = {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  prevBounds?: { x: number; y: number; width: number; height: number };
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
};

type Store = {
  windows: Record<string, WindowState>;
  order: string[]; // open app ids (for indicator dots)
  topZ: number;
  openApp: (appId: string, title: string, defaults?: { width?: number; height?: number }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string, viewport: { width: number; height: number }) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, bounds: { x: number; y: number; width: number; height: number }) => void;
};

const MENU_BAR_H = 28;
const DOCK_RESERVE = 96;

export const useWindowStore = create<Store>((set, get) => ({
  windows: {},
  order: [],
  topZ: 10,
  openApp: (appId, title, defaults) => {
    // If already open, focus / restore it
    const existing = Object.values(get().windows).find((w) => w.appId === appId);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) {
        set((s) => ({
          windows: { ...s.windows, [existing.id]: { ...existing, minimized: false } },
        }));
      }
      return;
    }
    const id = `${appId}-${Date.now()}`;
    const width = defaults?.width ?? 720;
    const height = defaults?.height ?? 480;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const offset = get().order.length * 28;
    const x = Math.max(40, Math.min(vw - width - 40, (vw - width) / 2 + offset));
    const y = Math.max(MENU_BAR_H + 20, Math.min(vh - height - DOCK_RESERVE, (vh - height) / 2 - 40 + offset));
    const topZ = get().topZ + 1;
    set((s) => ({
      topZ,
      order: s.order.includes(appId) ? s.order : [...s.order, appId],
      windows: {
        ...s.windows,
        [id]: {
          id,
          appId,
          title,
          x,
          y,
          width,
          height,
          minimized: false,
          maximized: false,
          zIndex: topZ,
        },
      },
    }));
  },
  closeWindow: (id) => {
    const w = get().windows[id];
    if (!w) return;
    set((s) => {
      const next = { ...s.windows };
      delete next[id];
      const stillOpen = Object.values(next).some((x) => x.appId === w.appId);
      return {
        windows: next,
        order: stillOpen ? s.order : s.order.filter((a) => a !== w.appId),
      };
    });
  },
  focusWindow: (id) => {
    const w = get().windows[id];
    if (!w) return;
    if (w.zIndex === get().topZ && !w.minimized) return;
    const topZ = get().topZ + 1;
    set((s) => ({
      topZ,
      windows: { ...s.windows, [id]: { ...w, zIndex: topZ, minimized: false } },
    }));
  },
  minimizeWindow: (id) => {
    const w = get().windows[id];
    if (!w) return;
    set((s) => ({ windows: { ...s.windows, [id]: { ...w, minimized: true } } }));
  },
  toggleMaximize: (id, viewport) => {
    const w = get().windows[id];
    if (!w) return;
    if (w.maximized && w.prevBounds) {
      set((s) => ({
        windows: {
          ...s.windows,
          [id]: { ...w, ...w.prevBounds!, maximized: false, prevBounds: undefined },
        },
      }));
    } else {
      set((s) => ({
        windows: {
          ...s.windows,
          [id]: {
            ...w,
            prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
            x: 0,
            y: MENU_BAR_H,
            width: viewport.width,
            height: viewport.height - MENU_BAR_H - DOCK_RESERVE,
            maximized: true,
          },
        },
      }));
    }
  },
  moveWindow: (id, x, y) => {
    const w = get().windows[id];
    if (!w) return;
    set((s) => ({ windows: { ...s.windows, [id]: { ...w, x, y, maximized: false } } }));
  },
  resizeWindow: (id, bounds) => {
    const w = get().windows[id];
    if (!w) return;
    set((s) => ({ windows: { ...s.windows, [id]: { ...w, ...bounds, maximized: false } } }));
  },
}));
