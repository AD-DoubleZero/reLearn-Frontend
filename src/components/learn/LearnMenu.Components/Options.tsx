import React from 'react'
import DropDownBlock from '../../universal/DropDownBlock'
import AcceptableLevels from './Options.Components/AcceptableLevels'
import TypeOfTraining from './Options.Components/TypeOfTraining'

const Options = () => {
  return (
    <DropDownBlock title="Настроить">
      <TypeOfTraining />
      <AcceptableLevels />
    </DropDownBlock>
  )
}

export default Options