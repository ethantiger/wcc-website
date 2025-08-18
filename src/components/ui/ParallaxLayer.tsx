import { useEffect, useState } from "react";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

// Custom hook for parallax offset calculation

const CustomParallaxLayer = ({
  speed,
  image,
  colour,
  factor = 1,
  pageOffset = 0,
  children,
  className = "",
  style = {},
}: {
  speed: number;
  image?: string;
  colour?: string;
  factor?: number;
  pageOffset?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(
    useSpring(scrollY, { bounce: 0 }),
    (latest) => latest * -0.5 * speed + pageOffset * window.innerHeight
  );

  return (
    <motion.div
      className={`absolute inset-0 bg-cover bg-no-repeat w-full h-[${factor * 100}vh] bg-center ${className} bg-[${colour}]`}
      style={{
        y,
        backgroundImage: image ? `url(${image})` : undefined,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CustomParallaxLayer;