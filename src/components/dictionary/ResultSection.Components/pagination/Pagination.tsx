import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../..'
import { QUERY_COLLOCATION_LIMIT } from '../../../../utils/consts'
import PaginationItem from './Pagination_item'

const Paginagion = observer(() => {
  const { count, page, result, isProcessed } = useContext(Context).dictionary

  const [countOfPages, setCountOfPages] = useState(0)
  const [selectablePages, setSelectablePages] = useState<number[]>([])

  useEffect(() => {
    setCountOfPages(Math.ceil(count / QUERY_COLLOCATION_LIMIT))
  }, [count])

  useEffect(() => {
    const selectablePagesCandidate: number[] = []

    let i = page - 2

    if (countOfPages) {
      while (selectablePagesCandidate.length < 5 && i < countOfPages) {
        if (i > 1 && i < countOfPages) {
          selectablePagesCandidate.push(i)
        }
        i += 1
      }

      setSelectablePages(selectablePagesCandidate)
  }
  }, [countOfPages, page, result])

  if (isProcessed || result.length === 0) {
    return null
  }

  return (
    <div className="cont mt-4">
      <div className="w-full">
        <div className="mx-auto w-fit flex justify-center h-[38px] cursor-pointer">
          {
            countOfPages > 1 &&
            <PaginationItem number={1} />
          }
          {
            selectablePages.map((p, idx) => 
              <React.Fragment key={idx + "_page"}>
                <PaginationItem number={p} />
              </React.Fragment>
            )
          }
          {
            countOfPages > 1 &&
            <PaginationItem number={countOfPages} />
          }
        </div>
      </div>
    </div>
  )
})

export default Paginagion