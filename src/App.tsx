import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useCollection } from './hooks/useCollection.ts'

function App() {
  const [count, setCount] = useState(0)
  const { documents } = useCollection(`carpools${import.meta.env.VITE_COLLECTION_SUFFIX || '_test'}`)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="documents">
        {documents && documents.map(doc => (
          <div key={doc.id} className="document">
            <h3>{doc.name} {doc.car} {doc.size}</h3>
            {doc.people.length !== 0 && doc.people.map((p: string) => <p>{p}</p>)}
          </div>
        ))}
      </div>
      <p>NEW CHANGE</p>
    </>
  )
}

export default App
