import React from 'react'
import {styled} from 'linaria/react'

interface StyleProps {
  absolute?: boolean
}

const Error = styled.div<StyleProps>`
  min-height: 16px;
  color: red;
  position: ${p => (p.absolute ? 'absolute' : 'static')};
`

interface Props {
  text: string | null
  absolute?: boolean
  className?: string
}

export function FormError(props: Props) {
  const {text, ...rest} = props
  return <Error {...rest}>{text}</Error>
}
