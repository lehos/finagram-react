import {useState} from 'react'

import {useModal} from './useModal'

export function useEntityPage() {
  const {showModal, hideModal, isModalVisible} = useModal()

  const [id, setId] = useState<string | null>(null)

  function edit(pid: string) {
    setId(pid)
    showModal()
  }

  function clear() {
    setId(null)
  }

  return {
    entity: {id, edit, clear},
    modal: {
      show: showModal,
      hide: hideModal,
      visible: isModalVisible
    }
  }
}
