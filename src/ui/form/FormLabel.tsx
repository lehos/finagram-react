import React, {ReactNode} from 'react'
import {styled} from 'linaria/react'

const Label = styled.div`
  margin-bottom: 10px;
`

interface Props {
  children: ReactNode
}

export function FormLabel(props: Props) {
  return <Label>{props.children}</Label>
}
