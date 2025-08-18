import Title from '../components/Title'
import About from '../components/About'
import Events from '../components/Events'
import History from '../components/History'
import Sponsors from '../components/Sponsors'
import Resources from '../components/Resources'
import Contact from '../components/Contact'

export default function Homepage() {
  return (
    <>
      <div className="absolute w-full h-[160vh] overflow-hidden transform top-0 left-0">
          <Title />
          {/* You had an incomplete ParallaxLayer here, so I'm removing it */}
      </div>
      <div className="h-[150vh]"></div>
      <About />
      <Events />
      <History />
      <Sponsors />
      <Resources />
      <Contact />
    </>
  )
}