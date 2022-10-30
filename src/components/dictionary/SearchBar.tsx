import { observer } from 'mobx-react-lite'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Context } from '../..'
import useInput from '../../hooks/useInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass }  from '@fortawesome/free-solid-svg-icons'

import { QUERY_COLLOCATION_LIMIT } from '../../utils/consts'
import Input from '../universal/Input'
import LanguageMenu from '../universal/LanguageMenu'
import QueryBtn from '../universal/QueryBtn'
import CollocationAPI from '../../http/CollocationAPI'
import { TSorting } from '../../utils/interfaces'

const SearchBar = observer(() => {
  const { dictionary, language } = useContext(Context)

  const {
    setIsPropsHaveBeenChanged, setIsProcessed,
    sorting, input: inputFromStore, tags, page,
    setResult, setCount, setInput, setSorting,
    setIsReady, isReady, isPropsHaveBeenChanged,
   } = dictionary

   const { selectedLanguageId } = language

  const [selectedSorting, setSelectedSorting] = useState<TSorting>("BODY_ASC")

  const { bind: bindInput, value: input } = useInput("")

  const handleChangeSorting = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    setIsPropsHaveBeenChanged(true)
		setSelectedSorting((event.target as HTMLSelectElement).value as TSorting);
	}, [setIsPropsHaveBeenChanged, setSelectedSorting])

  const searchQueryHandler = useCallback(async () => {
    setIsProcessed(true)

    selectedLanguageId &&
    CollocationAPI.get(selectedLanguageId, {
      body: inputFromStore,
      sorting: sorting,
      tags: tags,
      page: page,
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
    setIsProcessed, selectedLanguageId, inputFromStore, sorting,
    tags, page, setResult, setCount, setIsPropsHaveBeenChanged,
  ])

  useEffect(() => {
    setInput(input)
    setSorting(selectedSorting)
  }, [
    input,
    selectedSorting,
    setInput,
    setSorting,
  ])

  useEffect(() => {
    if  (
      selectedLanguageId &&
      tags.length
    ) {
        setIsReady(true)
    } else {
      setIsProcessed(true)
      setIsReady(false)
    }
  }, [selectedLanguageId, tags])

  useEffect(() => {
    isReady && searchQueryHandler()
  }, [
    isReady, searchQueryHandler,
    setIsProcessed, setIsReady
  ])

  return (
    <div className="cont">
      <div className="sm:flex sm:space-x-2">
        <div className="sm:w-1/2 h-[72px] mb-2 sm:mb-0">
          <div className="flex flex-col justify-between h-full">
            <h1 className="m-0">Поиск:</h1>
            <div className="flex h-[38px] space-x-0 [&>.container-btn]:h-full">
              <Input
                className="rounded-r-none"
                placeholder="Введите запрос или оставьте поле пустым"
                {...bindInput}
                hintText="Введите поисковый запрос"
                searchBar
              />
              <QueryBtn
                className="h-[38px] w-full rounded-l-none"
                disabled={!isPropsHaveBeenChanged}
                query={searchQueryHandler}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </QueryBtn>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 h-[72px]">
          <div className="flex space-x-2 h-full">
            <div className="w-1/2">
              <LanguageMenu />
            </div>
            <div className="w-1/2 h-full">
              <div className="flex flex-col justify-between h-full">
                <h1 className="m-0">Сортировка:</h1>
                <select
                  className="select"
                  value={selectedSorting}
                  onChange={handleChangeSorting}
                >
                  <option value="BODY_ASC">По алфавиту</option>
                  <option value="BODY_DESC">По алфавиту (С конца)</option>
                  <option value="DATE_DESC">Сначала новые</option>
                  <option value="DATE_ASC">Сначала старые</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default SearchBar