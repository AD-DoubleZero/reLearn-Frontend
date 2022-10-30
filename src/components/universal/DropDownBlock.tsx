import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useState } from 'react'

interface IDropDownLinkProps {
  children: any
  title: string
  opened?: boolean
}

const DropDownBlock = ({ children, title, opened } : IDropDownLinkProps) => {
  const [isOpened, setIsOpened] = useState(opened)

  const openHandler = useCallback(() => {
    setIsOpened(prev => !prev)
  }, [ setIsOpened ])

  return (
    <div className={`dropdownblock cont ${isOpened ? "" : "overflow-hidden"}`}>
      <div
        onClick={openHandler}
        className="flex justify-between cursor-pointer"
      >
        <h1 className="text-xl flex items-center">{title}</h1>
        <div className="caret relative h-10 w-10">
          <FontAwesomeIcon
            className={`down absolute h-10 w-10 text-text transition-all duration-300 ease-in-out ${isOpened ? "scale-0" : "scale-100"}`}
            icon={faCaretDown}
          />
          <FontAwesomeIcon
            className={`up absolute h-10 w-10 text-text transition-all duration-300 ease-in-out ${isOpened ? "scale-100" : "scale-0"}`}
            icon={faCaretUp}
          />
        </div>
      </div>
      <div
        className={`body ${isOpened ? "opacity-100 [&>div]:mt-2 [&>div]:h-full" : "max-h-0 py-0 opacity-0"}`}
      >
        <div className="mt-0 h-0">
          { children }
        </div>
      </div>
    </div>
  )
}

export default DropDownBlock