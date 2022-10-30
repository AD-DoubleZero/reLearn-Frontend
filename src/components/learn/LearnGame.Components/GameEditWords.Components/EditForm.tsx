import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useContext, useState } from 'react'
import { Context } from '../../../..'
import useInput from '../../../../hooks/useInput'
import CollocationAPI from '../../../../http/CollocationAPI'
import { ICollocation } from '../../../../utils/interfaces'
import DropDownBlock from '../../../universal/DropDownBlock'
import Input from '../../../universal/Input'
import QueryBtn from '../../../universal/QueryBtn'
import TranscriptionInput from '../../../universal/TranscriptionInput'

interface IEditForm {
  collocation: ICollocation
  idx: number
}

const EditForm = ({ collocation, idx }: IEditForm) => {

  const {
    editCollocation,
    incActiveIdx,
    decActiveIdx
  } = useContext(Context).learn

  const meaningInput = useInput(collocation.meaning || "")
  const associationInput = useInput(collocation.association  || "")
  const transcriptionInput = useInput(collocation.transcription || "")

  const queryBtnRef = React.createRef<HTMLButtonElement>()

  const [savedMeaning, setSavedMeaning] = useState(collocation.meaning || "")
  const [savedAssociation, setSavedAssociation] = useState(collocation.association || "")
  const [savedTranscriprion, setSavedTranscriprion] = useState(collocation.transcription || "")

  const queryHandler = useCallback(async () => {
    if (meaningInput.value === "") {
      meaningInput.setInvalid(true)
      throw new Error("empty meaning value").message
    }

    const isMeaningChanged = savedMeaning !== meaningInput.value
    const isAssociationChanged = savedAssociation !== associationInput.value
    const isTranscriptionChanged = savedTranscriprion !== transcriptionInput.value

    if (isMeaningChanged || isAssociationChanged || isTranscriptionChanged) {
      const meaning = meaningInput.value.toLocaleLowerCase().trim()
      const association = associationInput.value.toLocaleLowerCase().trim()
      const transcription = transcriptionInput.value.trim()

      setSavedMeaning(meaning)
      setSavedAssociation(association)
      setSavedTranscriprion(transcription)

      await CollocationAPI.put(collocation.id, {
        meaning: meaning || "",
        association: association || "",
        transcription: transcription || "",
      })

      editCollocation(idx, {
        meaning,
        association,
        transcription
      })
    }

    incActiveIdx()
  }, [
    meaningInput, savedMeaning,
    associationInput, savedAssociation,
    transcriptionInput, savedTranscriprion,
    incActiveIdx, editCollocation
  ])

  return (
    <div className="w-full">
      {/* Left */}
      {
        idx !== 0 &&
        <div className="pb-6 flex justify-center">
          <FontAwesomeIcon
            onClick={decActiveIdx}
            className="h-8 w-8 cursor-pointer text-text"
            icon={faAngleUp}
          />
        </div>
      }

      {/* Form */}
      <div className="card max-w-[365px]">
        <div className="mb-2 pb-2 border-b border-b-divider">
          <h1 className="text-center text-xl">{collocation.body}</h1>
        </div>
        <div>
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
        </div>
        <div className="mt-2">
          <DropDownBlock opened title="Дополнительно">
            <div>
              <div className="mb-2 pb-2 border-b border-b-divider">
                <Input
                  {...associationInput.bind}
                  placeholder="Введите ассоциацию"
                  type="text"
                  hintText="Вы можете придумать некую ассоциацию, с которой можно связать данное слово. Это может помочь вам запомнить это слово. Пример: «Pear (Груша)» - «Груша в перьях». Ассоциацию нужно представлять в голове во время первых повторений слов, чтобы закрепить нейронные связи."
                />
              </div>

              <div>
                <TranscriptionInput
                  {...transcriptionInput.bind}
                  placeholder="Укажите, как произносить слово"
                  hintText="Вы можете написать здесь любую подсказку. Это может быть ударение, транскрипция или текст транслитом. Примеры: «Apple» - «æpl», «Cat» - «Кэт», «Звони´т». Специальные символы доступны под этим полем."
                />
              </div>
            </div>
          </DropDownBlock>
        </div>
        <div className="mt-2 pt-2 border-t border-t-divider">
          <QueryBtn ref={queryBtnRef} query={queryHandler}>
            Сохранить
          </QueryBtn>
        </div>
      </div>

      {/* Right */}
      <div className="pt-6 flex justify-center">
        <FontAwesomeIcon
          onClick={() => queryBtnRef.current?.click()}
          className="h-8 w-8 cursor-pointer text-text"
          icon={faAngleDown}
        />
      </div>
    </div>
  )
}

export default EditForm