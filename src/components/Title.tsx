import { ParallaxLayer } from '@react-spring/parallax'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.png'
import bg3 from '../assets/bg3.png'
import bg4 from '../assets/bg4.png'
import bg5 from '../assets/bg5.png'
import bg6 from '../assets/bg6.png'
import bg7 from '../assets/bg7.png'
import bg8 from '../assets/bg8.png'
import bg9 from '../assets/bg9.png'
import phonebg from '../assets/phonebg.png'
import wccLogo from '../assets/WCC-logo.png'

export default function Title() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 5000);
 
    return () => clearInterval(interval);
  }, []);

  const factor = 2;

  return (
    <>
      {!isMobile ? (
        <>{[bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9].map((bg, i) => (
          <ParallaxLayer
            key={i}
            offset={0}
            speed={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1][i]}
            factor={factor}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}</>
      ) : (
        <ParallaxLayer
          offset={0}
          style={{
            backgroundImage: `url(${phonebg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <ParallaxLayer speed={0.1}>
        <img src={wccLogo} alt="WCC Logo" className="relative w-30 md:w-50 top-10 md:top-2/12 mx-auto opacity-80" />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.1}>
        <h1 className="relative top-4/12 md:top-[50vh] translate-y-[-50%] z-10 mx-auto max-w-4xl text-center font-bold text-slate-700 text-6xl md:text-7xl dark:text-slate-300 py-4">
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
            {"Hey Climber!".split("").map((char, index) => (
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
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative top-4/12 md:top-[50vh] translate-y-[-50%] z-10 mx-3 md:mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-200 md:text-neutral-600"
        >
          Join a community of climbers who share your passion for bouldering, sport climbing, and adventure.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative top-4/12 md:top-[50vh] translate-y-[-50%] z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
          href="https://westernusc.store/product/western-climbing-club/"
          className="text-center w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
          Become a Member!
          </a>
        </motion.div>
      </ParallaxLayer>
    </>
  )
}