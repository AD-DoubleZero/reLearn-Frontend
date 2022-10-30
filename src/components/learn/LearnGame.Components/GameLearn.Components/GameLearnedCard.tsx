import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../../../..'
import { ILearnedCollocation } from '../../../../utils/interfaces'
import QueryBtn from '../../../universal/QueryBtn'

interface IGameLearnedCard {
  idx: number
  collocation: ILearnedCollocation
}

const GameLearnedCard = observer(({idx, collocation} : IGameLearnedCard) => {

  const {
    activeIdx, startLearningCollocation, endLearningCollocation,
    incActiveIdx, failLearningCollocation
  } = useContext(Context).learn

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (activeIdx === idx + 1) {
      setTimeout(() => setIsMounted(true), 300)
      setTimeout(() => startLearningCollocation(idx), 300)
    }
  }, [activeIdx, idx, setIsMounted, startLearningCollocation])

  const rememberHandler = useCallback(async () => {
    endLearningCollocation(idx)
    incActiveIdx()
  }, [idx, endLearningCollocation, incActiveIdx])

  const forgotHandler = useCallback(async () => {
    endLearningCollocation(idx)
    failLearningCollocation(idx)
    incActiveIdx()
  }, [
    idx, endLearningCollocation,
    failLearningCollocation, incActiveIdx
  ])

  return (
    <div className="">
      <div className="card">
        <div className="mb-2 pb-2 border-b border-b-secondary">
          <h1 className="text-2xl text-center">
            {
              collocation.isInverted ?
              collocation.meaning :
              collocation.body
            }
          </h1>
          <p className="text text-center min-h-[24px]">
            {
              collocation.isInverted ?
              "-" :
              collocation.transcription
            }
          </p>
        </div>

        <div className="">
          <QueryBtn
            query={rememberHandler}
            onEnter
            flexCenter
            className="w-full"
          >
            Помню
          </QueryBtn>

          <QueryBtn
            query={forgotHandler}
            flexCenter
            className="bg-secondary !text-button w-full mt-2"
          >
            Забыл
          </QueryBtn>
        </div>
      </div>

      <div className={`mx-auto mt-1 h-1 rounded transition-all duration-[5000ms] ease-linear ${isMounted ? "bg-[red] w-full" : "bg-[green] w-0"}`}></div>

        <div className="mt-2">
          <p className={`text text-center min-h-[24px] transition-opacity delay-[2000ms] duration-[5000ms] ease-linear ${isMounted ? "opacity-100" : "opacity-0"}`}>
            { collocation.association }
          </p>
        </div>
    </div>
  )
})

export default GameLearnedCard