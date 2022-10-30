import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import LanguageAPI from '../../http/LanguageAPI'
import UserAPI from '../../http/UserAPI'

interface ILanguageMenu {
  className?: string
}

const LanguageMenu = ({ className }: ILanguageMenu) => {
  const { dictionary, language } = useContext(Context)

  const { setIsPropsHaveBeenChanged } = dictionary

  const {
    languages, selectedLanguageId, setLanguages,
    setSelectedLanguageId, 
  } = language

  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState(selectedLanguageId)

  const handleChangeLanguage = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    setIsPropsHaveBeenChanged(true)
    const selectedLang = +(event.target as HTMLSelectElement).value

		setSelectedLanguage(selectedLang)

    UserAPI.put({lastSelectedLanguage: selectedLang})
  }, [setIsPropsHaveBeenChanged, setSelectedLanguage])

  useEffect(() => {
    if (!languages.length) {
      LanguageAPI.get().then(res => {
        setLanguages(res)
      })
        .finally(() => setIsLoading(false))
    }
  }, [languages, setIsLoading, setLanguages])

  useEffect(() => {
    setSelectedLanguageId(selectedLanguage)
  }, [selectedLanguage, setSelectedLanguageId])

  // useEffect(() => {
  //   setSelectedLanguage(selectedLanguageId)
  // }, [selectedLanguageId, setSelectedLanguage])

  return (
    <div className="flex flex-col justify-between h-full">
      <h1 className="m-0">Язык:</h1>
      <select
        className={`select ` + className}
        value={selectedLanguage}
        disabled={isLoading}
        onChange={handleChangeLanguage}
      >
        {
          languages.map(language =>
          <option key={language.id} value={language.id}>{language.title}</option>
          )
        }
      </select>
    </div>
  )
}

export default LanguageMenu