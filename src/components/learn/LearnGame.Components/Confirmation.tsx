import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useContext, useState } from 'react'
import { Context } from '../../..'
import QueryBtn from '../../universal/QueryBtn'

interface IConfirmationProps {
  query: () => Promise<void>
  title: string
  children?: any
}

const Confirmation = ({query, title, children}: IConfirmationProps) => {
  const { setGameIsStarted, decActiveIdx } = useContext(Context).learn
  const [className, setClassname] = useState("opacity-100")

  const queryHandler = useCallback(async () => {
    query && await query()

    setClassname("opacity-0")

    setTimeout(() => setGameIsStarted(true), 1000)
  }, [query, setGameIsStarted])

  return (
    <div className={`w-full transition-opacity duration-700 ease-in-out ${className}`}>
      {/* Left */}
      <div className="pb-6 flex justify-center">
        <FontAwesomeIcon
          onClick={decActiveIdx}
          className="h-8 w-8 cursor-pointer text-text"
          icon={faAngleUp}
        />
      </div>

      {/* Form */}
      <div className="card">
        <div className="mb-4 pb-2 border-b border-b-secondary">
          <h1>{title}</h1>
          {children}
        </div>
        <div className="">
          <QueryBtn query={queryHandler}>
            Продолжить
          </QueryBtn>
        </div>
      </div>
    </div>
  )
}

export default Confirmation