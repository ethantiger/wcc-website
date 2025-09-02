import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BouncingText({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 5000);
 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0,
        ease: "easeInOut",
      }}
      className="mr-2 inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{
            y: 0,
          }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.01, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="inline-block whitespace-pre font-sans tracking-tight"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )

}