export function PlaceholderApp({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="text-5xl opacity-40">✦</div>
      <h2 className="text-lg font-semibold text-foreground">{name}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Coming soon. This window is a placeholder — content for {name} will be added later.
      </p>
    </div>
  );
}
