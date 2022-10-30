import { observer } from 'mobx-react-lite'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Context } from '../../..'
import useInput from '../../../hooks/useInput'
import TagAPI from '../../../http/TagAPI'
import ModalExecutor from '../../modal/ModalExecutor'
import Input from '../../universal/Input'

const AddTag = observer(() => {

  const {
    setIsPropsHaveBeenChanged, setTags, tags
  } = useContext(Context).dictionary

  const [isLimit, setIsLimit] = useState(false)

  const {
    value: input, bind: inputBind, clear
  } = useInput("")

  const addTagHandler = useCallback(async () => {
    setIsPropsHaveBeenChanged(true)

    const tag = await TagAPI.post(input)
    setTags([...tags, tag])

    clear()
  }, [
    input, setIsPropsHaveBeenChanged, clear,
    tags, setTags
  ])

  useEffect(() => {
    if (tags.length > 20) {
      setIsLimit(true)
    }
  }, [tags])

  return (
    <>
      {
        isLimit ?
        <p className="text">Нельзя добавить больше тегов..</p> :
        <ModalExecutor
          className="!block text-center"
          titleLink="Добавить тег"
          titleModal="Введите название тега"
          query={addTagHandler}
        >
          <Input
            placeholder=""
            className="mt-2"
            {...inputBind}
          />
        </ModalExecutor>
      }
    </>
  )
})

export default AddTag