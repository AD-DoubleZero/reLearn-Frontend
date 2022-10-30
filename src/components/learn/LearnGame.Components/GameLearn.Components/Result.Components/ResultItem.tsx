import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../..'
import { ILearnedCollocation } from '../../../../../utils/interfaces'

interface IResultItem {
  collocation: ILearnedCollocation
  idx: number
}

const ResultItem = observer(({collocation, idx} : IResultItem) => {

  const {
    activeIdx, slidersCount, reverseIsFailedOfLearningCollocation
  } = useContext(Context).learn

  const [isMounted, setIsMounted] = useState(false)

  const [time, setTime] = useState("")
  const [timeValue, setTimeValue] = useState(0)

  const [timeMs, setTimeMs] = useState("")

  useEffect(() => {
    if (activeIdx === slidersCount - 1) {
      setIsMounted(true)
    }
  }, [activeIdx, slidersCount])

  const { endOfLearning, startOfLearning } = collocation

  useEffect(() => {
    if (isMounted) {
      const value = endOfLearning - startOfLearning
      setTimeValue(value)
    }
  }, [isMounted, endOfLearning, startOfLearning])

  useEffect(() => {
    if (isMounted) {
      const timeFormated = new Intl.DateTimeFormat("ru-RU", {
        second: "2-digit"
      })
        .format(new Date(timeValue))

      setTime(timeFormated)

      setTimeMs(new Date(timeValue).getMilliseconds().toString().slice(0, -1))
    }
  }, [isMounted, timeValue])

  return (
    <li
      onClick={() => reverseIsFailedOfLearningCollocation(idx)}
      className="cursor-pointer mb-1 pb-2 border-b border-b-secondary transition-[border] duration-500 ease-in-out hover:border-b-text"
    >
      <div className="text text-lg">
        <span className="text-center hint--right hint--medium" data-hint={
           collocation.isInverted ? collocation.body : collocation.meaning
        }>
          <span className="text">
            { collocation.isInverted ? collocation.meaning : collocation.body }
          </span>
        </span>
      </div>

      <div className="flex justify-between space-x-2">
        <div className="text">
          <b>Время: </b>
          <span className="hint--bottom" data-hint="секунды.миллисекунды">
            <span className="text">{`${time}.${timeMs}` }</span>
          </span>
        </div>

        <div className="text">
          <span className="hint--left hint--medium" data-hint="Зависит от того, на какую кнопку вы нажали во время процесса.">
            <span className="text">{
              collocation.isFailed ? "FAILED" : "OK"
            }</span>
          </span>
        </div>
      </div>
    </li>
  )
})

export default ResultItem