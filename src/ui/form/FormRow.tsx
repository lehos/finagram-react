import React, {ReactNode} from 'react'
import {styled} from 'linaria/react'

const Row = styled.div`
  margin-bottom: 20px;
`

interface Props {
  children: ReactNode
}

export function FormRow(props: Props) {
  return <Row>{props.children}</Row>
}
