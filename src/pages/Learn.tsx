import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'

const Learn = observer(() => {
  const { learn } = useContext(Context)
  return (
    <>
      {
        learn.allowToStart?
        "Game" :
        "Menu"
      }
    </>
  )
})

export default Learn