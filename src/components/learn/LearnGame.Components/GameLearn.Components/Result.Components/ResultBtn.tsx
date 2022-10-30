import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../../..'
import ClusterAPI from '../../../../../http/ClusterAPI'
import { LEARN_ROUTE } from '../../../../../utils/consts'
import { ICluster } from '../../../../../utils/interfaces'
import QueryBtn from '../../../../universal/QueryBtn'

const ResultBtn = observer(() => {
  const {
    cluster, removeFailedCollocations,
    learnedCollocations, reset
  } = useContext(Context).learn

  const { id, isReadyForMerge, collocations } = cluster as ICluster

  const { length: lengthLearnedCollocations } = learnedCollocations

  const navigate = useNavigate()

  const queryHandler = useCallback(async () => {
    let collocationsToRecreateId: number[] = []

    if (removeFailedCollocations) {
      const onlyIdArray = learnedCollocations
        .filter(c => c.isFailed === true)
        .map(c => +c.id)

      const arraySet = new Set(onlyIdArray)

      collocationsToRecreateId = Array.from(arraySet)
    }

    await ClusterAPI.put(id, {
      repeatCount: lengthLearnedCollocations,
      isReadyForMerge: isReadyForMerge,
      repeatedCollocationsId: collocations,
      collocationsToRecreateId,
    })

    reset()

    navigate(LEARN_ROUTE)
  }, [
    id, lengthLearnedCollocations, isReadyForMerge,
    collocations, learnedCollocations, removeFailedCollocations
  ])

  return (
    <QueryBtn query={queryHandler}>
      Сохранить
    </QueryBtn>
  )
})

export default ResultBtn