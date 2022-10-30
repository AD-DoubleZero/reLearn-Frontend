import React, { useContext, useCallback } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react-lite'
import { Context } from '../../..'
import Link from '../../universal/Link'
import TagAPI from '../../../http/TagAPI'

interface IRemoveTag {
  id: number
}

const RemoveTag = observer(({ id } : IRemoveTag) => {
  const { removeTag } = useContext(Context).dictionary

  const removeLinkHandler = useCallback(async () => {
    if (await TagAPI.delete(id)) {
      removeTag(id)
    }
  }, [id, removeTag])

  return (
    <Link onClick={removeLinkHandler} withoutLine className="mt-2 mr-2">
      <FontAwesomeIcon className="text-button transition-colors duration-75 ease-in-out hover:text-opacity-70" icon={faTrash} />
    </Link>
  )
})

export default RemoveTag