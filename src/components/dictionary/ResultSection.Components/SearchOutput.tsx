import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../..'
import { ICollocation } from '../../../utils/interfaces'
import Spinner from '../../universal/Spinner'
import Collocation from './collocation/Collocation'

const SearchOutput = observer(() => {

  const {isProcessed, result} = useContext(Context).dictionary

  const [isLoading, setIsLoading] = useState(true)
  const [collocations, setCollocations] = useState<ICollocation[]>([])

  useEffect(() => {
    setIsLoading(isProcessed)
  }, [isProcessed])

  useEffect(() => {
    setCollocations(result)
  }, [result])

  return (
    <div>
      {
          isLoading ?
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <Spinner inContainer />
          </div> :
          <>
            {
              collocations.length ?

              collocations.map((collocation) =>
                <React.Fragment key={collocation.id}>
                  <Collocation>
                    { collocation }
                  </Collocation>
                </React.Fragment>
              )                   :

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <p
                  className="text text-center opacity-70"
                >
                  Ничего не найдено...
                </p>
              </div>
            }
          </>
        }
    </div>
  )
})

export default SearchOutput