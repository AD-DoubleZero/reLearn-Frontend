import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useState } from 'react'
import { Context } from '../../..'
import ClusterAPI from '../../../http/ClusterAPI'
import LanguageMenu from '../../universal/LanguageMenu'
import QueryBtn from '../../universal/QueryBtn'

const StartBar = observer(() => {
  const { language, learn } = useContext(Context)

  const { selectedLanguageId } = language

  const {
    acceptableLevels,
    setCluster,
    setCollocations,
    setAllowToStart,
  } = learn

  const [error, setError] = useState("")

  const startQuery = useCallback(async () => {
    setError("")

    await ClusterAPI.get(selectedLanguageId, {
      acceptableLevels,
    }).then((res) => {
      setCluster(res.cluster)
      setCollocations(res.collocations)
      setAllowToStart(true)
    })
      .catch((err) => {
        alert(err)
      })
  }, [
    selectedLanguageId,
    acceptableLevels,
    setCluster,
    setCollocations,
    setAllowToStart,
  ])

  return (
    <div>
      <div className="sm:flex sm:space-x-2">
        <div className="mb-2 sm:mb-0 sm:grow">
          <LanguageMenu />
        </div>

        <div className="mx-auto w-max flex items-end">
          <QueryBtn
            query={startQuery}
            className="mx-auto h-[38px] text-xl px-10 flex items-center"
            flexCenter
          >Начать учить</QueryBtn>
        </div>
      </div>

      {error && <p className="text-error text-center mt-2">{error}</p>}
    </div>
  )
})

export default StartBar