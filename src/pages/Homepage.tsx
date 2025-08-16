import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import Title from '../components/Title'
import About from '../components/About'
import Events from '../components/Events'
import History from '../components/History'
import Sponsors from '../components/Sponsors'
import Resources from '../components/Resources'
import Contact from '../components/Contact'

export default function Homepage() {

  return (
    <Parallax id="scroll-container" pages={4.5} style={{ top: 0, left: 0 }} innerStyle={{ scrollSnapAlign: 'start'}}>
      <Title />
      <ParallaxLayer offset={1} speed={1}>
        <About />
        <Events />
        <History />
        <Sponsors />
        <Resources />
        <Contact />
      </ParallaxLayer>
    </Parallax>
  )
}