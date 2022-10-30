import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useReducer } from 'react'
import { Context } from '../../..'

interface State {
  formOpacity: string
  cardTranslateY: string
  active: boolean
}

interface Action {
  type: 'active' | 'toLeft' | 'toRight'
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'active':
      return {
        formOpacity: "opacity-100",
        cardTranslateY: "translate-y-0",
        active: true,
      }

    case 'toLeft':
      return {
        formOpacity: "opacity-0",
        cardTranslateY: "-translate-y-full",
        active: false,
      }

    case 'toRight':
      return {
        formOpacity: "opacity-0",
        cardTranslateY: "translate-y-full",
        active: false,
      }

    default:
      return state;
  }
}

interface IFullscreenSliderItemProps {
  index: number
  children: any
}

const FullscreenSliderItem = observer(({ index, children }: IFullscreenSliderItemProps) => {
  const { activeIdx } = useContext(Context).learn

  const [state, dispatch] = useReducer(reducer, {
    formOpacity: "opacity-0",
    cardTranslateY: "translate-y-full",
    active: false
  })

  const { active, formOpacity, cardTranslateY } = state

  useEffect(() => {
    if (activeIdx === index) {
      dispatch({type: "active"})
    } else

    if (activeIdx < index && active) {
      dispatch({type: "toRight"})
    } else

    if (activeIdx > index && active) {
      dispatch({type: "toLeft"})
    }
  }, [activeIdx, active, index])

  return (
    <div className={`absolute overflow-x-hidden flex items-center justify-center transition-transform duration-300 ease-in-out h-screen w-full ${cardTranslateY}`}>
      <div className={`transition-opacity delay-300 duration-300 ease-in-out ${formOpacity}`}>
        <div className="w-fit max-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
})

export default FullscreenSliderItem