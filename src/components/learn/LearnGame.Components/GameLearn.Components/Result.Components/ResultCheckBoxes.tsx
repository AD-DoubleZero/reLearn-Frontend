import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../../../../..'
import { ICluster } from '../../../../../utils/interfaces'
import CheckBox from '../../../../universal/CheckBox'

const ResultCheckBoxes = observer(() => {
  const {
    cluster, changeIsReadyForMerge,
    setRemoveFailedCollocations, typeOfTraining
  } = useContext(Context).learn

  const { isReadyForMerge } = cluster as ICluster

  const [mergeCheckBox, setMergeCheckBox] = useState(isReadyForMerge)
  const [removeCheckBox, setRemoveCheckBox] = useState(true)

  const mergeCheckBoxOnChangeHandler = useCallback(() => {
    setMergeCheckBox(prev => !prev)
  }, [])

  const removeCheckBoxOnChangeHandler = useCallback(() => {
    setRemoveCheckBox(prev => !prev)
  }, [])

  useEffect(() => {
    changeIsReadyForMerge(mergeCheckBox)
  }, [mergeCheckBox, changeIsReadyForMerge])

  useEffect(() => {
    setRemoveFailedCollocations(removeCheckBox)
  }, [removeCheckBox, setRemoveFailedCollocations])

  return (
    <div>
      {
        typeOfTraining === "both" &&
        <span
          className="block hint--bottom hint--large"
          data-hint="Набор объединится с другим пройденным набором того же уровня. Если такого набора пока нет, этот набор сам станет кандидатом на объединение. Набор будет попадаться в последнюю очередь до тех пор, пока не объединится."
        >
          <CheckBox
            label="Пометить набор как пройденный"
            id={"-check-tag-" + "is-ready-for-merge"}
            checked={mergeCheckBox}
            onChange={mergeCheckBoxOnChangeHandler}
          />
        </span>
      }

      <span
        className="block hint--bottom hint--large"
        data-hint="Слова, которые имеют приписку «FAILED», добавятся к вам на аккаунт как неотсортированные. Вы можете вручную нажатием на слово в списке ниже изменять состояние с «ОК» на «FAIL» и наоборот."
      >
      <CheckBox
        label="Пересоздать незапомнившиеся слова"
        id={"-check-tag-" + "removable"}
        checked={removeCheckBox}
        onChange={removeCheckBoxOnChangeHandler}
      />
      </span>
    </div>
  )
})

export default ResultCheckBoxes