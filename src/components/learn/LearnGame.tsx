import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer } from 'react'
import { Context } from '../..'
import { ICluster } from '../../utils/interfaces'
import GameEditWords from './LearnGame.Components/GameEditWords'
import GameLearn from './LearnGame.Components/GameLearn'
import GamePreparation from './LearnGame.Components/GamePreparation'

interface IState {
  isMustToSaved: boolean
  isGamePreparation: boolean
  isGame: boolean
  isResult: boolean
}

interface IAction {
  type: "mustToSaved" | "gamePreparation" | "game" | "result"
}

const initialState = {
  isMustToSaved: false,
  isGamePreparation: false,
  isGame: false,
  isResult: false,
}

function reducer (state: IState, action: IAction) {
  switch (action.type) {
    case "mustToSaved":
      return {
        ...initialState,
        isMustToSaved: true
      }

    case "gamePreparation":
      return {
        ...initialState,
        isGamePreparation: true
      }

    case "game":
      return {
        ...initialState,
        isGame: true
      }

    case "result":
      return {
        ...initialState,
        isResult: true
      }

    default:
      return state;
  }
}

const Game = observer(() => {
  const { learn } = useContext(Context)

  const { cluster, gameIsStarted } = learn

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (cluster && Object.keys(cluster).length > 0) {

      if (!(cluster as ICluster).isSaved) {
        dispatch({type: "mustToSaved"})
      } else {
        dispatch({type: "gamePreparation"})
      }

    }
  }, [cluster])

  useEffect(() => {
    if (gameIsStarted) {
      dispatch({type: "game"})
    }
  }, [gameIsStarted])

  return (
    <>
      { state.isMustToSaved && (<GameEditWords />) }
      { state.isGamePreparation && (<GamePreparation />) }
      { state.isGame && (<GameLearn />) }
    </>
  )
})

export default Game