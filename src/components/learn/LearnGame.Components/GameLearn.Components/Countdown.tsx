import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer } from 'react'
import { Context } from '../../../..'

interface IState {
  isOne: boolean
  isTwo: boolean
  isThree: boolean
  isStart: boolean
}

interface IAction {
  type: "1" | "2" | "3" |"start"
}

const initialState: IState = {
  isOne: false,
  isTwo: false,
  isThree: false,
  isStart: false,
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "1":
      return {
        ...initialState,
        isOne: true
      }

    case "2":
      return {
        ...initialState,
        isTwo: true
      }

    case "3":
      return {
        ...initialState,
        isThree: true
      }

    case "start":
      return {
        ...initialState,
        isStart: true
      }
    default:
      return state
  }
}

const Countdown = observer(() => {
  const { incActiveIdx, startLearning } = useContext(Context).learn

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    setTimeout(() => dispatch({type: "1"}), 300)
    setTimeout(() => dispatch({type: "2"}), 1300)
    setTimeout(() => dispatch({type: "3"}), 2300)
    setTimeout(() => dispatch({type: "start"}), 3300)
  }, [])

  const {
    isStart, isOne, isTwo, isThree
  } = state

  useEffect(() => {
    if (isStart) {
      incActiveIdx()
      startLearning()
    }
  }, [isStart, incActiveIdx, startLearning])

  return (
    <div className="relative h-screen w-screen">
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOne ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <h1 className="text-4xl">1</h1>
      </div>

      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isTwo ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <h1 className="text-4xl">2</h1>
      </div>

      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isThree ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <h1 className="text-4xl">3</h1>
      </div>

      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isStart ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      >
        <h1 className="text-4xl">Start!</h1>
      </div>
    </div>
  )
})

export default Countdown