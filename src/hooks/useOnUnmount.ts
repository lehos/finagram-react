import { useEffect } from 'react'

export function useOnUnmount(cb: (...args: any) => any | Promise<any>) {
  useEffect(() => {
    return () => {
      cb()
    }
  }, [])
}
