export default function ParallaxContainer({ pages, children }: { pages: number, children: React.ReactNode }) {
  return (
    <div className={`absolute overflow-hidden w-full transform top-0 left-0`}
      style={{ height: `${pages * 100}vh` }}
    >
      {children}
    </div>
  );
}