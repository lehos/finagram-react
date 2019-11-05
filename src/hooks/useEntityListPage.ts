import { useState } from 'react'

import { useModal } from './useModal'

export function useEntityListPage<T = null>() {
  const { show, hide, isVisible } = useModal()

  const [id, setId] = useState<string | null>(null)
  const [obj, setObj] = useState<T | null>(null)

  function editById(pid: string) {
    setId(pid)
    show()
  }

  function edit(objParam: T) {
    setObj(objParam)
    show()
  }

  function clear() {
    setObj(null)
  }

  return {
    entity: { obj, edit, id, editById, clear },
    modal: { show, hide, isVisible }
  }
}
