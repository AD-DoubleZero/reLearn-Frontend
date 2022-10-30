import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../../../../..'
import useInput from '../../../../../hooks/useInput'
import CollocationAPI from '../../../../../http/CollocationAPI'
import { ICollocation } from '../../../../../utils/interfaces'
import ModalExecutor from '../../../../modal/ModalExecutor'
import Input from '../../../../universal/Input'
import TranscriptionInput from '../../../../universal/TranscriptionInput'
import EditTagCheckBox from './EditTagCheckBox'

interface IEditProps {
  collocation: ICollocation
}

const Edit = observer(({collocation} : IEditProps) => {

  const { tags, editCollocation } = useContext(Context).dictionary

  const [disabled, setDisabled] = useState(false)

  const { id } = collocation

  const meaningInput = useInput(collocation.meaning  || "")
  const associationInput = useInput(collocation.association  || "")
  const transcriptionInput = useInput(collocation.transcription || "")

  const [tagsState, setTagsState] = useState<number[]>([...collocation.tags as number[]])

  const onTrue = useCallback((id: number) => {
    setTagsState(prev => [...prev, +id])
  }, [])
  const onFalse = useCallback((id: number) => {
    setTagsState(prev => prev.filter(t => +t !== +id))
  }, [])

  useEffect(() => {
    if (meaningInput.value.trim() === "") {
      setDisabled(true)
      meaningInput.setInvalid(true)
    } else {
      setDisabled(false)
      meaningInput.setInvalid(false)
    }
  }, [meaningInput])

  const queryHandler = useCallback(async () => {
    const tagsToAdd: number[] = []
    const meaning = meaningInput.value.trim()
    const association = associationInput.value.trim()
    const transcription = transcriptionInput.value.trim()

    tagsToAdd.push(...tagsState.filter(t => t !== 0))

    if (tagsToAdd.length === 0) {
      tagsToAdd.push(0)
    }

    await CollocationAPI.put(id, {
      meaning,
      association,
      transcription,
      tags: tagsToAdd,
    })

    editCollocation(id, {
      meaning,
      association,
      transcription,
      tags: tagsToAdd,
    })
  }, [
    meaningInput,
    associationInput,
    transcriptionInput,
    tagsState,
    id,
    editCollocation
  ])

  return (
    <ModalExecutor
      withoutLine
      className="h-10 w-10 flex items-center justify-center [&>.text>svg]:transition-colors [&>.text>svg]:duration-75 [&>.text>svg]:ease-in-out [&:hover>.text>svg]:text-opacity-70"
      titleLink={
        <FontAwesomeIcon
          className='text-text'
          icon={faPenToSquare}
        />
      }
      titleModal={`Редактировать «${collocation.body}»`}
      btnDisabled={disabled}
      query={queryHandler}
    >
      <div className="cont">
        <div className="mb-2 pb-2 border-b border-b-divider">
          <Input
            {...meaningInput.bind}
            placeholder="Введите значение"
            type="text"
            hintText="Введите в поле значение. Это может быть перевод иностранного слова или смысл крылатой фразы. Это то, что вы хотите запомнить. Не рекомендуется слишком часто менять это поле."
            errorText="Не оставляйте поле пустым!"
            isInvalid={meaningInput.isInvalid}
          />
        </div>

        <div className="mb-2 pb-2 border-b border-b-divider">
          <Input
            {...associationInput.bind}
            placeholder="Введите ассоциацию"
            type="text"
            hintText="Вы можете придумать некую ассоциацию, с которой можно связать данное слово. Это может помочь вам запомнить это слово. Пример: «Pear (Груша)» - «Груша в перьях». Ассоциацию нужно представлять в голове во время первых повторений слов, чтобы закрепить нейронные связи."
          />
        </div>

        <div className="mb-2 pb-2 border-b border-b-divider">
          <TranscriptionInput
            {...transcriptionInput.bind}
            placeholder={"Укажите как произносится слово"}
            hintText="Вы можете написать здесь любую подсказку. Это может быть ударение, транскрипция или текст транслитом. Примеры: «Apple» - «æpl», «Cat» - «Кэт», «Звони´т». Специальные символы доступны под этим полем."
          />
        </div>

        <div className="mb-2 pb-2">
          <h1>Теги:</h1>
          <ol>
            {
              tags.map((t, idx) =>
                <li key={idx + "_edit-tag"}>
                  <EditTagCheckBox
                    id={`col-${collocation.id}_tag-${t.id}`}
                    collocation={collocation}
                    tag={t}
                    onTrue={() => onTrue(t.id)}
                    onFalse={() => onFalse(t.id)}
                  />
                </li>
              )
            }
          </ol>
        </div>
      </div>
    </ModalExecutor>
  )
})

export default Edit