import type { ComponentType } from "react";
import { User, FolderGit2, Mail, TerminalSquare, Image as ImageIcon, Settings } from "lucide-react";
import { PlaceholderApp } from "./placeholder";

export type AppDef = {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  iconBg: string; // tailwind gradient classes
  component: ComponentType;
  defaultSize?: { width: number; height: number };
};

export const APPS: AppDef[] = [
  {
    id: "about",
    name: "About Me",
    icon: User,
    iconBg: "from-sky-400 to-blue-600",
    component: () => <PlaceholderApp name="About Me" />,
  },
  {
    id: "projects",
    name: "Projects",
    icon: FolderGit2,
    iconBg: "from-amber-400 to-orange-600",
    component: () => <PlaceholderApp name="Projects" />,
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: ImageIcon,
    iconBg: "from-pink-400 to-rose-600",
    component: () => <PlaceholderApp name="Gallery" />,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: TerminalSquare,
    iconBg: "from-zinc-700 to-zinc-900",
    component: () => <PlaceholderApp name="Terminal" />,
  },
  {
    id: "contact",
    name: "Contact",
    icon: Mail,
    iconBg: "from-emerald-400 to-teal-600",
    component: () => <PlaceholderApp name="Contact" />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    iconBg: "from-slate-400 to-slate-700",
    component: () => <PlaceholderApp name="Settings" />,
  },
];

export const getApp = (id: string) => APPS.find((a) => a.id === id);
