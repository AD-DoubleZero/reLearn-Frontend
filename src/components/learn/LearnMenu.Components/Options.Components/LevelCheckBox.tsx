import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../../../..'
import CheckBox from '../../../universal/CheckBox'

interface ILevelCheckBoxProps {
  id: string
  label: string
  level: number
}

const LevelCheckBox = observer(({
  id, label, level,
}: ILevelCheckBoxProps) => {

  const { learn } = useContext(Context)

  const { pushAcceptableLevel, removeAcceptableLevel, } = learn

  const [checked, setChecked] = useState(true)

  const changeHandler = useCallback(() => {
    setChecked(prev => !prev)
  }, [])

  useEffect(() => {
    if (checked) {
      pushAcceptableLevel(level)
    } else {
      removeAcceptableLevel(level)
    }
  }, [checked, pushAcceptableLevel, removeAcceptableLevel])

  return (
    <div>
      <CheckBox
        checked={checked}
        onChange={changeHandler}
        id={id}
        label={label}
      />
    </div>
  )
})

export default LevelCheckBox