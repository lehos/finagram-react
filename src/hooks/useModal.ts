import { useState } from 'react'

export function useModal() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function showModal() {
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
  }

  return { isModalVisible, showModal, hideModal }
}
