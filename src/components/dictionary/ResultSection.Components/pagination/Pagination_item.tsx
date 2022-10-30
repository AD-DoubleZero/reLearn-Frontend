import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../../../..'
import CollocationAPI from '../../../../http/CollocationAPI'
import { QUERY_COLLOCATION_LIMIT } from '../../../../utils/consts'

interface IPaginationItem {
  number: number
}

const PaginationItem = observer(({number} : IPaginationItem) => {
  const { dictionary, language } = useContext(Context)

  const {
    setIsProcessed, input, sorting, tags, page,
    setResult, setCount, setIsPropsHaveBeenChanged,
    setPage
  } = dictionary

  const { selectedLanguageId } = language

  const [disabled, setDisabled] = useState(false)

  const searchQuery = useCallback(async () => {
    setIsProcessed(true)

    CollocationAPI.get(selectedLanguageId, {
      body: input,
      sorting,
      tags,
      page,
      limit: QUERY_COLLOCATION_LIMIT,
    }).then((result) => {
      setResult(result.collocations)
      setCount(result.count)
    })
      .finally(() => {
        setIsPropsHaveBeenChanged(false)
        setIsProcessed(false)
      })
      .catch((error) => alert(error))
  }, [
    selectedLanguageId, input, sorting, tags,
    page, setResult, setCount, setIsProcessed,
    setIsPropsHaveBeenChanged
  ])

  const searchQueryHandler = useCallback(() => {
    setPage(number)
    searchQuery()
  }, [searchQuery, number, setPage])

  useEffect(() => {
    if (page === number) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [page, number])

  return (
    <button
      onClick={searchQueryHandler}
      className="h-full first:rounded-l last:rounded-r disabled:opacity-70 disabled:cursor-default bg-button hover:opacity-70 text-buttonText text-xl px-3 py-2 flex justify-center items-center border-r border-opacity-25 border-r-text last:border-none"
      disabled={disabled}
    >
      {number}
    </button>
  )
})

export default PaginationItem