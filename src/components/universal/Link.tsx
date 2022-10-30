import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ILinkProps {
  children?: any,
  href?: string,
  onClick?: Function,
  className?: string,
  withoutLine?: boolean,
  _blank?: boolean
}

const Link = (
  {
    children, href, onClick, className, withoutLine, _blank,
  } : ILinkProps
) => {

  const navigate = useNavigate()

  const action: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()
    onClick && onClick()

    if (_blank && href) {
      window.open(href,'_blank')
    } else if (href) {
      navigate(href)
    }
  }

  const classes = `link relative cursor-pointer no-underline border-b-0 inline-block pb-[3px] [&:hover>.line]:bg-link [&:hover>.line]:h-[2px] [&:focus>.line]:bg-link [&:focus>.line]:h-[2px] ${className? className: ""}`

  return (
    <a
      className={ classes }
      href={href}
      onClick={action}
    >
      <span className="text text-link">{ children }</span>
      {
        !withoutLine &&
        <span className="line block absolute bg-transparent h-0 bottom-0 left-0 right-0 transition-[height,background-color] duration-200 ease-in-out rounded-lg"></span>
      }
    </a>
  )
}

export default Link