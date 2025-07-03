import { useState } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import bg1 from './assets/bg1.png'
import bg2 from './assets/bg2.png'
import bg3 from './assets/bg3.png'
import bg4 from './assets/bg4.png'
import bg5 from './assets/bg5.png'
import bg6 from './assets/bg6.png'
import bg7 from './assets/bg7.png'

import { useCollection } from './hooks/useCollection.ts'

const factor = 2
function App() {
  const [count, setCount] = useState(0)
  const { documents } = useCollection(`carpools${import.meta.env.VITE_COLLECTION_SUFFIX || '_test'}`)

  return (
    <>
      <div>
        <Parallax pages={2} style={{ top: '0', left: '0' }}>
          <ParallaxLayer speed={0.1} factor={factor} style={{backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
          <ParallaxLayer speed={0.2} factor={factor} style={{backgroundImage: `url(${bg2})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
          <ParallaxLayer speed={0.3} factor={factor} style={{backgroundImage: `url(${bg3})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
          <ParallaxLayer speed={0.4} factor={factor} style={{backgroundImage: `url(${bg4})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
          <ParallaxLayer speed={0.5} factor={factor} style={{backgroundImage: `url(${bg5})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
          <ParallaxLayer speed={0.7} factor={1.5} style={{backgroundImage: `url(${bg6})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
          <ParallaxLayer speed={1} factor={factor} style={{backgroundImage: `url(${bg7})`, backgroundSize: 'cover', backgroundPosition:'center'}} />
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
      </div>
    </>
  )
}

export default App
