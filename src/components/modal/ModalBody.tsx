import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import QueryBtn from '../universal/QueryBtn'

interface IModalBodyProps {
  children?: any
  title?: string
  onHide: () => void
  justInfo?: boolean
  query?: () => Promise<void>
  visible: boolean
  btnDisabled?: boolean
}

const ModalBody = ({
  children, title, onHide, justInfo,
  query, visible, btnDisabled,
}: IModalBodyProps) => {

  const closeFromBg = useCallback((event: MouseEvent) => {
    if ((event.target as HTMLElement).dataset.close) {
      onHide()
    }
  }, [onHide])

  const queryHandler = useCallback(async () => {
    query && await query().then(onHide)
  }, [query, onHide])

  useEffect(() => {
    const modalBg = document.getElementById("modal-bg") as HTMLElement
    if (visible) {
      modalBg.classList.add("modal-active")
      modalBg.onclick = closeFromBg
    } else {
      modalBg.classList.remove("modal-active")
      modalBg.onclick = () => {}
    }
  }, [visible, closeFromBg])

  if (!visible) {
    return null
  }

  return createPortal(
    <>
      {/* modal header */}
      <div className="mb-4 pb-2 border-b border-secondary flex justify-between">
        <h1>
          { title }
        </h1>
        <FontAwesomeIcon onClick={onHide} className="w-6 h-6 text-text cursor-pointer" icon={faXmark} />
      </div>


      {/* modal body */}
      <div>
        { children }
      </div>

      {/* modal footer */}
      {
        !justInfo && 
        <div
          className="mt-4 pt-2 border-t border-secondary"
        >
          <QueryBtn
            onEnter
            query={queryHandler}
            disabled={btnDisabled}
          >
            Окей
          </QueryBtn>
        </div>
      }
    </>,
    document.getElementById("modal-card") as HTMLElement
  )
}

export default ModalBody