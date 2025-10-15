import Title from '@/components/Title'
import Team from '@/components/Team'
import Events from '@/components/Events'
// import History from '@/components/History'
// import Sponsors from '@/components/Sponsors'
// import Resources from '@/components/Resources'
import Contact from '@/components/Contact'
import Pricing from '@/components/Pricing'

export default function Homepage() {
  return (
    <>
      <Title />
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