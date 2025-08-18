export default function ParallaxContainer({ pages, children }: { pages: number, children: React.ReactNode }) {
  return (
    <div className={`absolute w-full h-[${pages * 100}vh] overflow-hidden transform top-0 left-0`}>
      {children}
    </div>
  );
}