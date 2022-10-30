import React, { useState, useContext, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import RemoveTag from './RemoveTag'
import { Context } from '../../..'
import { ITag } from '../../../utils/interfaces'
import CheckBox from '../../universal/CheckBox'

interface ITagCheckBoxProps {
  tag: ITag
}

const TagCheckBox = observer(({ tag }: ITagCheckBoxProps) => {
  const { changeTagChecked, setIsPropsHaveBeenChanged } = useContext(Context).dictionary

  const { id } = tag

  const [isChecked, setIsChecked] = useState(true)

  const isRemovable = id !== 0

  const changeHandler = useCallback(() => {
    setIsChecked(prev => !prev)
  }, [])

  useEffect(() => {
    changeTagChecked(id, isChecked)
    setIsPropsHaveBeenChanged(true)
  },
    [ isChecked, id, changeTagChecked, setIsPropsHaveBeenChanged ]
  )

  return (
    <div className="flex justify-between">
      <CheckBox
        label={tag.title}
        checked={isChecked}
        onChange={changeHandler}
        id={"form-check-tag-" + id}
      />
      {
        isRemovable &&
        <RemoveTag id={id} />
      }
    </div>
  )
})

export default TagCheckBox