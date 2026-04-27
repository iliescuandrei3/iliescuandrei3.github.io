import { APPS } from "@/apps/registry";
import MacOSDock from "@/components/ui/mac-os-dock";
import { useWindowStore } from "@/stores/windowStore";

const DOCK_APPS = [
  {
    id: "finder",
    name: "Finder",
    icon: "https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024",
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: "https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024",
  },
  {
    id: "mail",
    name: "Mail",
    icon: "https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024",
  },
  {
    id: "notes",
    name: "Notes",
    icon: "https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024",
  },
  {
    id: "safari",
    name: "Safari",
    icon: "https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024",
  },
  {
    id: "photos",
    name: "Photos",
    icon: "https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024",
  },
  {
    id: "music",
    name: "Music",
    icon: "https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024",
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: "https://cdn.jim-nielsen.com/macos/1024/calendar-2021-04-29.png?rf=1024",
  },
];

export function Dock() {
  const order = useWindowStore((s) => s.order);
  const openApp = useWindowStore((s) => s.openApp);

  const handleClick = (id: string) => {
    const app = APPS.find((item) => item.id === id);
    const dockApp = DOCK_APPS.find((item) => item.id === id);

    if (!app && !dockApp) {
      return;
    }

    openApp(id, app?.name ?? dockApp!.name, app?.defaultSize);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[9999] flex justify-center">
      <MacOSDock apps={DOCK_APPS} onAppClick={handleClick} openApps={order} className="pointer-events-auto" />
    </div>
  );
}
