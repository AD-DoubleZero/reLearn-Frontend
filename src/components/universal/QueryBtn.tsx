import React, { useState, useCallback, useEffect, ForwardedRef } from 'react'
import Spinner from './Spinner'

interface IQueryBtnProps {
  // children?: string | undefined,
  ref?: ForwardedRef<HTMLButtonElement>
  children?: any,
  query?: () => Promise<void>,
  onEnter?: boolean,
  className?: string,
  disabled?: boolean,
  flexCenter?: boolean,
}

const QueryBtn = React.forwardRef(({
  ref, children, query, onEnter,
  className, disabled, flexCenter,
}: IQueryBtnProps, ) => {
  const [isLoading, setLoading] = useState(false)

  const btnClickHandler = useCallback(async () => {
    try {
      setLoading(true)
      query && await query()
      setLoading(false)
    } catch (e) {
      setLoading(false)
      alert(e)
    }
  }, [setLoading, query])

  useEffect(() => {
    if (onEnter) {
      const listener = (event: KeyboardEvent) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault()
          btnClickHandler()
        }
      }
      document.addEventListener("keydown", listener)
      return () => {
        document.removeEventListener("keydown", listener)
      }
    }
  }, [btnClickHandler, onEnter])

  const classesCnt = `min-h-[38px] min-w-[38px] h-fit ${flexCenter ? "flex justify-center items-center w-full" : "ml-auto w-fit"}`

  const classesBtn = `bg-button text-buttonText rounded hover:opacity-70 px-4 py-2 disabled:opacity-70 disabled:cursor-default ${className ? className : ""}`

  return (
    <div className={classesCnt}
    >
      {
        isLoading ?
        <Spinner inContainer /> :
        <button
          ref={ref}
          disabled={disabled}
          onClick={btnClickHandler}
          className={classesBtn}
        >
          {children}
        </button>
      }
    </div>
  )
})

export default QueryBtn