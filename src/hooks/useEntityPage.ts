import { useState } from 'react'

import { useModal } from './useModal'

export function useEntityPage<T = null>() {
  const { showModal, hideModal, isModalVisible } = useModal()

  const [id, setId] = useState<string | null>(null)
  const [obj, setObj] = useState<T | null>(null)

  function edit(pid: string) {
    setId(pid)
    showModal()
  }

  function editObj(objParam: T) {
    setObj(objParam)
    showModal()
  }

  function clear() {
    setId(null)
    setObj(null)
  }

  return {
    entity: { id, edit, clear, obj, editObj },
    modal: {
      show: showModal,
      // hide: hideModal,
      hide: () => {
        clear()
        hideModal()
      },
      visible: isModalVisible
    }
  }
}
