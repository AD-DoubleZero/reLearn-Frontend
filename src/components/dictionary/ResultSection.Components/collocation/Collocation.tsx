import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Info from './Info'
import Edit from './edit/Edit'
import { ICollocation } from '../../../../utils/interfaces'
import formatDate from '../../../../utils/formatDate'

interface ICollocationProps {
  children: ICollocation
}

const Collocation = observer(({ children }: ICollocationProps) => {

  const [dateCreatedAt, setDateCreatedAt] = useState("")

  const { createdAt, body } = children

  useEffect(() => {
    setDateCreatedAt(formatDate(+createdAt))
  }, [createdAt])

  return (
    <div className="flex space-x-2 pb-2 mb-2 last:mb-0 border-b border-b-secondary transition-[border] duration-500 ease-in-out hover:border-b-text">
      <div className="w-6/12 px-4 flex items-center">
        <span className="text">
          {body}
        </span>
      </div>
      <div className="w-4/12 flex justify-center items-center">
        <span className="text">
          {dateCreatedAt}
        </span>
      </div>
      <div className="w-2/12 flex justify-center items-center">
        <Info collocation={children} />
        <Edit collocation={children} />
      </div>
    </div>
)
})

export default Collocation