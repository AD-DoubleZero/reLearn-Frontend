import React from 'react'

interface ISpinnerProps {
  inContainer?: boolean
}

const Spinner = ({ inContainer }: ISpinnerProps) => {
  return (
    <div className={inContainer ? "relative aspect-square h-full max-h-[60px] min-h-[38px] mx-auto" : ""}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  )
}

export default Spinner