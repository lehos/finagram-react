import { useState } from 'react'

export function useModal() {
  const [isVisible, setIsVisible] = useState(false)

  function show() {
    setIsVisible(true)
  }

  function hide() {
    setIsVisible(false)
  }

  return { isVisible, show, hide }
}
