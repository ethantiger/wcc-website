import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const ParallaxLayer = ({
  speed = 1,
  image = undefined,
  colour = undefined,
  factor = 1,
  pageOffset = 0,
  children,
  className = "",
  style = {},
}: {
  speed?: number;
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
    useSpring(scrollY, { bounce: 0, visualDuration: 0.5 }),
    (latest) => latest * -1 * speed + pageOffset * window.innerHeight
  );

  return (
    <motion.div
      className={`absolute bg-cover w-full h-[${factor * 100}vh] bg-center bg-[${colour}] ${className}`}
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

export default ParallaxLayer;