import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../..'
import Spinner from '../../../components/universal/Spinner'
import FullscreenSlider from './FullscreenSlider'
import Countdown from './GameLearn.Components/Countdown'
import GameLearnedCard from './GameLearn.Components/GameLearnedCard'
import Result from './GameLearn.Components/Result'

const GameLearn = observer(() => {
  const { learn } = useContext(Context)
  const [loading, setLoading] = useState(true)

  const {
    collocations, setLearnedCollocations, startLearning,
    learnedCollocations
  } = learn

  useEffect(() => {
    setLearnedCollocations(collocations)
    startLearning()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <FullscreenSlider>
      <Countdown />

      {
        learnedCollocations.map((c, idx) => 
          <React.Fragment key={idx}>
            <GameLearnedCard idx={idx} collocation={c} />
          </React.Fragment>
        )
      }

      <Result />
    </FullscreenSlider>
  )
})

export default GameLearn