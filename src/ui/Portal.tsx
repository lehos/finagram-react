import { ReactNode, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: ReactNode
}

export function Portal(props: Props) {
  const root = useRef(document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(root.current)

    return () => {
      document.body.removeChild(root.current)
    }
  }, [])

  return ReactDOM.createPortal(props.children, root.current)
}
