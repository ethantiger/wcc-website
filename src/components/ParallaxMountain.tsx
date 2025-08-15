import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { motion } from 'framer-motion'

import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.png'
import bg3 from '../assets/bg3.png'
import bg4 from '../assets/bg4.png'
import bg5 from '../assets/bg5.png'
import bg6 from '../assets/bg6.png'
import bg7 from '../assets/bg7.png'

import { useCollection } from '../hooks/useCollection.ts'

export default function ParallaxMountains() {
  const { documents } = useCollection(`carpools${import.meta.env.VITE_COLLECTION_SUFFIX || '_test'}`)
  const factor = 2;

  return (
    <Parallax pages={2} style={{ top: '0', left: '0' }}>
      <ParallaxLayer speed={0.1} factor={factor} style={{backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={0.2} factor={factor} style={{backgroundImage: `url(${bg2})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={0.3} factor={factor} style={{backgroundImage: `url(${bg3})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={0.4} factor={factor} style={{backgroundImage: `url(${bg4})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={0.5} factor={factor} style={{backgroundImage: `url(${bg5})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={0.7} factor={1.5} style={{backgroundImage: `url(${bg6})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={1} factor={factor} style={{backgroundImage: `url(${bg7})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
      <ParallaxLayer speed={0.1} factor={factor}>
        <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300"
          style={{ top: '50vh', position: 'relative', transform: 'translateY(-50%)' }}
        >
          {"Hey Climber!"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          style={{ top: '50vh', position: 'relative', transform: 'translateY(-50%)' }}
        >
          Join a community of climbers who share your passion for bouldering, sport climbing, and adventure.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          style={{ top: '50vh', position: 'relative', transform: 'translateY(-50%)' }}
        >
          <a href="https://westernusc.store/product/western-climbing-club/" className="text-center w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Become a Member!
          </a>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Learn More
          </button>
        </motion.div>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={0.9} factor={1} style={{ backgroundColor: '#00185e'}}>
        <div className="documents">
          {documents && documents.map(doc => (
            <div key={doc.id} className="document">
              <h3>{doc.name} {doc.car} {doc.size}</h3>
              {doc.people.length !== 0 && doc.people.map((p: string) => <p>{p}</p>)}
            </div>
          ))}
        </div>
      </ParallaxLayer>
    </Parallax>
  )
}