import React from 'react'
import Options from './LearnMenu.Components/Options'
import StartBar from './LearnMenu.Components/StartBar'

const GameMenu = () => {
  return (
    <div className="cont max-w-4xl">
      <section className="card">
        <div className="mb-2 pb-4 border-b border-b-divider">
          <StartBar />
        </div>
        <Options />
      </section>
    </div>
  )
}

export default GameMenu