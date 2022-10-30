import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { Context } from '../../..'
import { ICluster } from '../../../utils/interfaces'
import QueryBtn from '../../universal/QueryBtn'
import Confirmation from './Confirmation'
import FullscreenSlider from './FullscreenSlider'
import PreparationCard from './GamePreparation.Components/PreparationCard'

interface IState {
  isDialogHiding: boolean
  isAllowToRepeat: boolean
  isUserAgreed: boolean
  isUserDisagreed: boolean
}

interface IAction {
  type: "reset" | "allowToRepeat" | "userAgreed" | "userDisagreed" | "hideDialog"
}

const initialState = {
  isDialogHiding: false,
  isAllowToRepeat: false,
  isUserAgreed: false,
  isUserDisagreed: false,
}

function reducer (state: IState, action: IAction) {
  switch (action.type) {
    case "reset":
      return {
        ...initialState
      }

    case "allowToRepeat":
      return {
        ...initialState,
        isAllowToRepeat: true
      }

    case "userAgreed":
      return {
        ...state,
        isUserAgreed: true,
      }

    case "userDisagreed":
      return {
        ...state,
        isUserDisagreed: true,
      }

    case "hideDialog":
      return {
        ...state,
        isDialogHiding: true,
    }

    default:
      return state
  }
}

const GamePreparation = () => {
  const { learn } = useContext(Context)

  const { cluster, collocations, setGameIsStarted } = learn
  const { level } = cluster as ICluster

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (cluster && Object.keys(cluster).length) {

      if (level as number <= 2) {
        dispatch({type: "allowToRepeat"})
      }

    }
  }, [level, cluster])

  const btnYesHandler = useCallback(async () => {
    dispatch({type: "hideDialog"})
    setTimeout(() => dispatch({type: "userAgreed"}), 1000)
  }, [])

  const btnNoHandler = useCallback(async () => {
    dispatch({type: "hideDialog"})
    dispatch({type: "userDisagreed"})
  }, [])

  const [classNameDialog, setClassNameDialog] = useState("opacity-100")
  const [classNameSlider, setClassNameSlider] = useState("opacity-0")

  const {
    isDialogHiding, isUserAgreed, isUserDisagreed, isAllowToRepeat
  } = state

  useEffect(() => {
    if (isDialogHiding) {
      setClassNameDialog("opacity-0")
      setTimeout(() => setClassNameSlider("opacity-100"), 1000)
    }
  }, [state, setClassNameDialog, setClassNameSlider])

  useEffect(() => {
    if (isUserDisagreed) {
      setTimeout(() => setGameIsStarted(true), 1000)
    }
  }, [isUserDisagreed])

  return (
    <>
      {
        isAllowToRepeat && !isUserAgreed &&

        <div className={`card mx-auto w-fit transition-opacity duration-700 ease-in-out ${classNameDialog}`}>
          <h1 className="mb-4">Хотите просмотреть слова, перед упражнением?</h1>
          <div className="flex w-fit ml-auto">
            <div className="w-1/2 px-1">
              <QueryBtn
                query={btnNoHandler}
                flexCenter
                className="!text-primary bg-text"
              >
                Нет
              </QueryBtn>
            </div>
            <div className="w-1/2 px-1">
              <QueryBtn query={btnYesHandler} flexCenter>
                Да
              </QueryBtn>
            </div>
          </div>
        </div>
      }

      {
        !isAllowToRepeat &&

        <div className={`card mx-auto w-fit transition-opacity duration-700 ease-in-out ${classNameDialog}`}>
          <div className="w-fit mx-auto">
            <QueryBtn flexCenter query={btnNoHandler}>Начать</QueryBtn>
          </div>

          <p className="text text-center mt-4 text-xs">
            Наборы начиная с 3 уровня нельзя просматривать перед упражнением.
          </p>
        </div>
      }

      {
        isUserAgreed &&
        <div className={`transition-opacity duration-700 ease-in-out ${classNameSlider}`}>
          <FullscreenSlider>
            {
              collocations.map((c, i) =>
                <React.Fragment key={`${i}_EditForm`}>
                  <PreparationCard idx={i} collocation={c} />
                </React.Fragment>
              )
            }
            <Confirmation
              title="Закончить и продолжить?"
              query={async () => {}}
            />
          </FullscreenSlider>
        </div>
      }
    </>
  )
}

export default GamePreparation