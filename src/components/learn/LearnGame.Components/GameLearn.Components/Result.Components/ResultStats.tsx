import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../..'

const ResultStats = observer(() => {
  const {
    activeIdx, slidersCount, startOfLearning,
    endOfLearning, learnedCollocations,
  } = useContext(Context).learn

  const [isMounted, setIsMounted] = useState(false)

  const [time, setTime] = useState("")
  const [timeMs, setTimeMs] = useState("")
  const [timeValue, setTimeValue] = useState(0)

  const [averageTime, setAverageTime] = useState("")
  const [averageTimeMs, setAverageTimeMs] = useState("")
  const [averageTimeValue, setAverageTimeValue] = useState(0)

  useEffect(() => {
    if (activeIdx === slidersCount - 1) {
      setIsMounted(true)
    }
  }, [activeIdx, slidersCount])

  useEffect(() => {
    if (isMounted) {
      setTimeValue(endOfLearning - startOfLearning)
    }
  }, [isMounted, endOfLearning, startOfLearning])

  const { endOfLearning: lastSlideEndOfLearning } = learnedCollocations[learnedCollocations.length-1]

  useEffect(() => {
    if (isMounted) {
      const timeOfCollocations = learnedCollocations.reduce(
        (prev: number, curr) => prev + (curr.endOfLearning - curr.startOfLearning), 0
      ) as number

      setAverageTimeValue(timeOfCollocations / learnedCollocations.length)
    }
  }, [isMounted, lastSlideEndOfLearning, learnedCollocations])

  useEffect(() => {
    if (isMounted) {
      const timeFormated = new Intl.DateTimeFormat("ru-RU", {
        minute: "2-digit",
        second: "2-digit",
      })
        .format(new Date(timeValue))

      setTime(timeFormated)

      setTimeMs(new Date(timeValue).getMilliseconds().toString().slice(0, -1))
    }
  }, [timeValue, isMounted])

  useEffect(() => {
    if (isMounted) {
      const averageTimeFormated = new Intl.DateTimeFormat("ru-RU", {
        second: "2-digit",
      })
        .format(new Date(averageTimeValue))

      setAverageTime(averageTimeFormated)

      setAverageTimeMs(new Date(averageTimeValue).getMilliseconds().toString().slice(0, -1))
    }
  }, [averageTimeValue, isMounted])

  return (
    <div>
      <h1 className="text-xl">Статистика:</h1>
      <ul>
        <li>
          <b>Количество повторений: </b>
          <span className="text">{ learnedCollocations.length }</span>
        </li>
        <li>
          <b>Время: </b>
          <span className="hint--bottom" data-hint="минуты:секунды.миллисекунды">
            <span className="text">{ `${time}.${timeMs}` }</span>
          </span>
        </li>
        <li>
          <b>В среднем на повтор: </b>
          <span className="hint--bottom" data-hint="секунды.миллисекунды">
            <span className="text">{ `${averageTime}.${averageTimeMs}` }</span>
          </span>
        </li>
      </ul>
    </div>
  )
})

export default ResultStats