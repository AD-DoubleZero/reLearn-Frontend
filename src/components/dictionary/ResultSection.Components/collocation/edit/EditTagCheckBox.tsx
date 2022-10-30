import React, { useCallback, useEffect, useState } from 'react'
import { ICollocation, ITag } from '../../../../../utils/interfaces'
import CheckBox from '../../../../universal/CheckBox'

interface IEditTagCheckBox {
  collocation: ICollocation
  tag: ITag
  id: string
  onTrue: () => void
  onFalse: () => void
}

const EditTagCheckBox = ({
  collocation, tag, id, onTrue, onFalse,
}: IEditTagCheckBox) => {
  const [checked, setChecked] = useState(false)

  const { tags } = collocation

  useEffect(() => {
    const array = [...tags as number[]]
    setChecked(array.includes(1))
  }, [tags])

  const onChange = useCallback(() => {
    if (checked) {
      onFalse()
    } else {
      onTrue()
    }
    setChecked(prev => !prev)
  }, [checked, onFalse, onTrue])

  if (tag.id === 0) {
    return null
  }

  return (
    <div>
      <CheckBox
        id={id}
        label={tag.title}
        onChange={onChange}
        checked={checked}
      />
    </div>
  )
}

export default EditTagCheckBox