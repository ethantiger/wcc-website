import Title from '@/components/Title'
import Team from '@/components/Team'
import Events from '@/components/Events'
import Tutorial from '@/components/Tutorial'
// import History from '@/components/History'
// import Sponsors from '@/components/Sponsors'
// import Resources from '@/components/Resources'
import Contact from '@/components/Contact'
import Pricing from '@/components/Pricing'

export default function Homepage() {
  return (
    <>
      <Title />
      <Tutorial />
      <Team />
      <Events />
      <Pricing />
      {/* <History /> */}
      {/* <Sponsors /> */}
      {/* <Resources /> */}
      <Contact />
    </>
  )
}