import React, { useCallback, useContext } from 'react'
import { Context } from '../../..'
import ClusterAPI from '../../../http/ClusterAPI'
import { ICluster } from '../../../utils/interfaces'
import Confirmation from './Confirmation'
import FullscreenSlider from './FullscreenSlider'
import EditForm from './GameEditWords.Components/EditForm'

const GameEditWords = () => {
  const { learn } = useContext(Context)

  const { cluster, collocations } = learn
  const { id } = cluster as ICluster

  const query = useCallback(async () => {
    await ClusterAPI.put(id, {isSaved: true})
  }, [id])

  return (
    <FullscreenSlider>
      {
        collocations.map((c, i) =>
          <React.Fragment key={`${i}_EditForm`}>
            <EditForm idx={i} collocation={c} />
          </React.Fragment>
        )
      }
      <Confirmation
        title="Сохранить набор и продолжить?"
        query={query}
      >
      </Confirmation>
    </FullscreenSlider>
  )
}

export default GameEditWords