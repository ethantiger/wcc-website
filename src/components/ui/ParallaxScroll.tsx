import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxScrollProps {
  images: string[];
  title?: string;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({ images, title }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.2,
  });

  // Parallax transform distances (smaller = smoother)
  const moveUp = useTransform(smoothProgress, [0, 1], [0, -200]);
  const moveDown = useTransform(smoothProgress, [0, 1], [0, 200]);

  // Column
  const columnCount = 5;
  const chunkSize = Math.ceil(images.length / columnCount);
  const columns = Array.from({ length: columnCount }, (_, i) =>
    images.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <section
      ref={ref}
      className="relative w-full overflow-visible bg-[#10091e] text-gray-200 py-20"
    >
      {title && (
        <h1 className="text-center text-4xl md:text-5xl font-bold text-purple-300 mb-16">
          {title}
        </h1>
      )}

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6">
        {columns.map((col, colIndex) => (
          <motion.div
            key={colIndex}
            style={{
              y: colIndex % 2 === 0 ? moveUp : moveDown,
              willChange: "transform",
            }}
            className="grid gap-6"
          >
            {col.map((img, i) => (
              <div
                key={`col-${colIndex}-img-${i}`}
                className="rounded-2xl overflow-hidden shadow-lg shadow-purple-900/30 transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={img}
                  alt={`parallax-${colIndex}-${i}`}
                  className="h-60 w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxScroll;
