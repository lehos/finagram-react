import React, { ReactNode } from 'react'
import { styled } from 'linaria/react'

const SFormLabel = styled.div`
  margin-bottom: 8px;
`

interface Props {
  children: ReactNode
}

export function FormLabel(props: Props) {
  return <SFormLabel>{props.children}</SFormLabel>
}
