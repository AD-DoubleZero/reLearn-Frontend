import React, { useCallback, useState } from 'react'
import Link from '../universal/Link'
import ModalBody from './ModalBody'

interface IModalProps {
  titleModal?: string
  children?: any
  justInfo?: boolean
  query?: () => Promise<void>
  titleLink?: any
  className?: string
  withoutLine?: boolean
  btnDisabled?: boolean
}

const ModalExecutor = ({
  titleModal, children, justInfo, query, titleLink,
  className, withoutLine, btnDisabled,
}: IModalProps) => {

  const [modalVisible, setModalVisible] = useState(false)

  const onShow = useCallback(() => {
    setModalVisible(true)
  }, [setModalVisible])

  const onHide = useCallback(() => {
    setModalVisible(false)
  }, [setModalVisible])

  const modalQuery = useCallback(async () => {
    query && await query()
  }, [query])

  return (
    <>
      <Link
        withoutLine={withoutLine}
        onClick={onShow}
        className={className}
      >
        {titleLink}
      </Link>
      <ModalBody
        onHide={onHide}
        visible={modalVisible}
        title={titleModal}
        justInfo={justInfo}
        query={modalQuery}
        btnDisabled={btnDisabled}
      >
        { children }
      </ModalBody>

    </>
  )
}

export default ModalExecutor