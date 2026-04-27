import { useWindowStore } from "@/stores/windowStore";
import { Window } from "./Window";

export function WindowManager() {
  const windows = useWindowStore((s) => s.windows);
  return (
    <div className="absolute inset-0">
      {Object.values(windows).map((w) => (
        <Window key={w.id} win={w} />
      ))}
    </div>
  );
}
