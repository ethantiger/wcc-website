import ParallaxLayer from './ui/ParallaxLayer'
import { motion } from 'framer-motion'
import { Fragment, useState, useEffect } from 'react'

import bg1 from '@/assets/bg1.png'
import bg2 from '@/assets/bg2.png'
import bg3 from '@/assets/bg3.png'
import bg4 from '@/assets/bg4.png'
import bg5 from '@/assets/bg5.png'
import bg6 from '@/assets/bg6.png'
import bg7 from '@/assets/bg7.png'
import bg8 from '@/assets/bg8.png'
import bg9 from '@/assets/bg9.png'
import phonebg from '@/assets/phonebg.png'
import wccLogo from '@/assets/WCC_Logo_White_-_No_Background.png'
import { ShootingStars } from './ui/shooting-stars'
import ParallaxContainer from './ui/ParallaxContainer'
import BouncingText from './ui/BouncingText'

export default function Title() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const factor = 2;

  return (
    <>
      <ParallaxContainer pages={isMobile ? 1 : 1.5}>
        {!isMobile ? (
          <>
            {[bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9].map((bg, i) => (
              <Fragment key={i}>
                <ParallaxLayer
                  speed={[0.1, 0.12, 0.25, 0.3, 0.35, 0.45, 0.7, 0.85, 1][i]}
                  factor={factor}
                  image={`${bg}`}
                />
                {i === 0 && <ShootingStars />}
              </Fragment>
            ))}
          </>
        ) : (
          <ParallaxLayer
            speed={0.8}
            image={`${phonebg}`}
          />
        )}
        <ParallaxLayer speed={isMobile ? 1 : 0.1}>
          <img src={wccLogo} alt="WCC Logo" className="relative w-30 md:w-40 top-10 md:top-2/12 mx-auto opacity-40" />
        </ParallaxLayer>
        <ParallaxLayer speed={isMobile ? 1 : 0.1}>
          <h1 className="relative top-4/12 md:top-[50vh] translate-y-[-50%] z-10 mx-auto max-w-4xl text-center font-bold text-slate-700 text-6xl md:text-7xl dark:text-slate-300 py-4">
            <BouncingText text="Hey Crusher!" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative top-4/12 md:top-[50vh] translate-y-[-50%] z-10 mx-3 md:mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-200 md:text-neutral-600"
          >
            Join a community of students who share your passion for bouldering, sport climbing, and adventure.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative top-4/12 md:top-[50vh] translate-y-[-50%] z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a target="_blank" href="https://westernusc.store/product/western-climbing-club/" className="relative inline-flex h-12 overflow-hidden rounded-full p-[4px] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white hover:bg-gray-200 px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl">
                Become a Member!
              </span>
            </a>
          </motion.div>
        </ParallaxLayer>
        <ParallaxLayer factor={2} speed={1} pageOffset={2} colour='#10091e' />
      </ParallaxContainer>
      <div className={`${isMobile ? 'h-[100vh]' : 'h-[140vh]'}`}></div>
    </>
  )
}