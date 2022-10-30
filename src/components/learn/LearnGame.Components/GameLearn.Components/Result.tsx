import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../..'
import ResultBtn from './Result.Components/ResultBtn'
import ResultCheckBoxes from './Result.Components/ResultCheckBoxes'
import ResultCollocationsStats from './Result.Components/ResultCollocationsStats'
import ResultStats from './Result.Components/ResultStats'

const Result = observer(() => {
  const { learn } = useContext(Context)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (learn.activeIdx === learn.slidersCount - 1) {
      learn.endLearning()
      setIsMounted(true)
    }
  }, [learn.activeIdx])

  return (
    <div>
      <div className="card">
        <div className={`mb-2 pb-2 border-b border-b-divider transition-opacity ease-in-out duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-2xl">Успех! Вы повторили набор!</h1>
        </div>

        <div className={`mb-2 pb-2 border-b border-b-divider transition-opacity delay-500 ease-in-out duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}>
          <ResultStats />
        </div>

        <div className={`mb-2 pb-2 border-b border-b-divider transition-opacity delay-1000 ease-in-out duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}>
          <ResultCheckBoxes />
        </div>

        <div className={`mt-4 transition-opacity delay-[1500ms] ease-in-out duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}>
          <ResultBtn />
        </div>
      </div>

      <div className="card">
        <div className={`mb-2 transition-opacity delay-[2000ms] ease-in-out duration-500 ${isMounted ? "opacity-100" : "opacity-0"}`}>
          <ResultCollocationsStats />
        </div>
      </div>
    </div>
  )
})

export default Result