import { observer } from 'mobx-react-lite'
import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../..'
import TagAPI from '../../http/TagAPI'
import { ITag } from '../../utils/interfaces'
import Spinner from '../universal/Spinner'
import AddTag from './TagsBar.Components/AddTag'
import TagCheckBox from './TagsBar.Components/TagCheckBox'

const TagsBar = observer(() => {
  const { dictionary } = useContext(Context)

  const { tags, setTags } = dictionary

  const [tagsState, setTagsState] = useState<ITag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    TagAPI.get().then(tagsRes => {
      setTags(tagsRes)
    })
      .finally(() => setLoading(false))
    }, [ setTags ])

  useEffect(() => {
    setTagsState(tags)
  }, [ tags ])

  return (
    <div className="card">
      <h6>Теги:</h6>
      <div className="mb-2">
        {
          loading ?
          <Spinner inContainer /> :
          <>
            {
              tagsState.length ?
              tagsState.map((tag) =>
                <React.Fragment key={tag.id}>
                  <TagCheckBox tag={tag} />
                </React.Fragment>
              )   :
              <p className="text">Вы еще не создали ни одного тега.</p>
            }
          </>
        }
      </div>

      <AddTag />
    </div>
  )
})

export default TagsBar