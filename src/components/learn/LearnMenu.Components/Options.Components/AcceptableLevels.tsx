import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../..'
import ClusterAPI from '../../../../http/ClusterAPI'
import Spinner from '../../../universal/Spinner'
import Enum from './Enum'
import LevelCheckBox from './LevelCheckBox'

const AcceptableLevels = observer(() => {
  const [clusters, setClusters] = useState<Array<number>>([])
  const [loading, setLoading] = useState(true)

  const { language } = useContext(Context)

  const { selectedLanguageId } = language

  useEffect(() => {
    ClusterAPI.getAvailableLevels(selectedLanguageId)
      .then(stats => {
        setClusters(stats.map(s => s.level))
      })
      .finally(() => setLoading(false))
  }, [selectedLanguageId])

  return (
    <div className="mt-6">
      <h1>Разрешить уровни:</h1>
      <p className="text-text">
        В первую очередь попадаются кластеры, которые реже всего повторялись.
      </p>
      <p className="text-text">
        Если разрешено создание кластера и на это хватает неотсортированных слов, это будет приоритетной задачей.
      </p>
      {
        loading ?
        <Spinner inContainer /> :
        <>
          <Enum>
            <LevelCheckBox
              level={0}
              id="createCluster-checkbox"
              label="Создать кластер"
            />

            {
              clusters.map(stat => {
                return (
                  <React.Fragment key={`level-${stat}-checkbox`}>
                    <LevelCheckBox
                      level={stat}
                      id={`level-${stat}-checkbox`}
                      label={`Уровень: ${stat}`}
                    />
                  </React.Fragment>
                )}
              )
            }
          </Enum>
        </>
      }
    </div>
  )
})

export default AcceptableLevels