import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import TagAPI from '../../../../http/TagAPI'
import formatDate from '../../../../utils/formatDate'
import { ICollocation, ITag } from '../../../../utils/interfaces'
import ModalExecutor from '../../../modal/ModalExecutor'
import Spinner from '../../../universal/Spinner'

interface IInfo {
  collocation: ICollocation
}

const Info = observer(({collocation} : IInfo) => {

  const [dateCreatedAt, setDateCreatedAt] = useState("")
  const [dateLastRepeat, setDateLastRepeat] = useState("")

  const [tagsState, setTagsState] = useState<ITag[]>([])
  const [isTagsLoading, setIsTagsLoading] = useState(true)

  const {
    tags, createdAt, lastRepeat, body, meaning,
    association, transcription, examples,
  } = collocation

  useEffect(() => {
    if (tags?.length) {
      setIsTagsLoading(true)

      if (!tags.includes(0)) {
        TagAPI.get({ certainTagsId: tags })
          .then((res) => {
            setTagsState(res)
          })
          .finally(() => {
            setIsTagsLoading(false)
          })
      } else {
        setTagsState([])
        setIsTagsLoading(false)
      }
    }
  }, [tags])

  useEffect(() => {
    setDateCreatedAt(formatDate(+createdAt))
  }, [createdAt])

  useEffect(() => {
    if (lastRepeat) {
      setDateLastRepeat(formatDate(+lastRepeat))
    }
  }, [lastRepeat])

  return (
    <ModalExecutor
      withoutLine
      className="h-10 w-10 flex items-center justify-center [&>.text>svg]:transition-colors [&>.text>svg]:duration-75 [&>.text>svg]:ease-in-out [&:hover>.text>svg]:text-opacity-70"
      titleLink={
        <FontAwesomeIcon
          className='text-text'
          icon={faCircleInfo}
        />
      }
      titleModal={body}
      justInfo
    >
      <div className="cont">
        {
          meaning &&
          <div className="cont flex justify-between space-x-2 mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
            <p className="text">
              Значение:
            </p>
            <p className="text">
              {meaning}
            </p>
          </div>
        }

        <div className="cont flex justify-between space-x-2 mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
          <p className="text">
            Дата добавления:
          </p>
          <p className="text">
            {dateCreatedAt}
          </p>
        </div>

        {
          dateLastRepeat &&
          <div className="cont flex justify-between space-x-2 mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
            <p className="text">
              Дата последнего повторения:
            </p>
            <p className="text">
              {dateLastRepeat}
            </p>
          </div>
        }

        {
          association &&
          <div className="cont flex justify-between space-x-2 mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
            <p className="text">
              Ассоциация:
            </p>
            <p className="text">
              {association}
            </p>
          </div>
        }

        {
          transcription &&
          <div className="cont flex justify-between space-x-2 mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
            <p className="text">
              Произношение:
            </p>
            <p className="text">
              {transcription}
            </p>
          </div>
        }

        {
          examples?.length !== 0 &&
          <div className="cont mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
            <p className="text">
              Примеры:
            </p>
            <ol>
              {
                (examples as string[]).map(e =>
                  <li>{e}</li>
                )
              }
            </ol>
          </div>
        }

        <div className="cont mb-2 pb-2 border-b border-b-divider transition-[border] duration-500 ease-in-out hover:border-b-text">
          <p className="text">
            Теги:
          </p>
          {
            isTagsLoading ?
            <Spinner inContainer /> :

            <ol>
              {
                tagsState.length ?
                tagsState.map(e =>
                  <li className="text">{e.title}</li>
                ) :
                <li className="text">Теги отсутствуют</li>
              }
            </ol>
          }
        </div>
      </div>
    </ModalExecutor>
  )
})

export default Info