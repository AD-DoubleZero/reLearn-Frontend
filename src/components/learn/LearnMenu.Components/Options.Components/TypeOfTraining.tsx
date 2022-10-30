import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useReducer, useState } from 'react'
import { Context } from '../../../..'
import { TTypeOfTraining } from '../../../../utils/interfaces'
import Radio from '../../../universal/Radio'
import Enum from './Enum'

interface IState {
  onlyBody: boolean
  onlyMeaning: boolean
  both: boolean
}

interface IAction {
  type: TTypeOfTraining
}

const initialState = {
  onlyBody: false,
  onlyMeaning: false,
  both: false,
}

function reducer (state: IState, action: IAction) {
  switch (action.type) {
    case "onlyBody":
      return {
        ...initialState,
        onlyBody: true
      }

    case "onlyMeaning":
      return {
        ...initialState,
        onlyMeaning: true
      }

    case "both":
      return {
        ...initialState,
        both: true
      }

    default:
      return state;
  }
}

const TypeOfTraining = observer(() => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { learn } = useContext(Context)

  const { setTypeOfTraining } = learn

  const changeTypeOfTraining = (type: TTypeOfTraining) => {
    setTypeOfTraining(type)
  }

  const changeOptionHandler = useCallback((selected: TTypeOfTraining) => {
    dispatch({ type: selected })
    changeTypeOfTraining(selected)
  }, [changeTypeOfTraining])

  return (
    <div>
      <h1>Выбрать тип тренировки:</h1>
      <p className="text-text">
        <b>Внимание!</b> Пометить кластер как пройденный можно только в режиме <b>«Смешанный»</b>
      </p>
      <Enum>
        <Radio
          name="options"
          onChange={() => changeOptionHandler("onlyBody")}
          checked={state.onlyBody}
          id='onlyBody'
          label="Только само слово"
        />
        <Radio
          name="options"
          onChange={() => changeOptionHandler("onlyMeaning")}
          checked={state.onlyMeaning}
          id='onlyMeaning'
          label="Только значение слова"
        />
        <Radio 
          name="options"
          onChange={() => changeOptionHandler("both")}
          checked={state.both}
          id='both'
          label="Смешанный режим"
        />
      </Enum>
    </div>
  )
})

export default TypeOfTraining