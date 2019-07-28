import React, {ReactNode} from 'react'
import {styled} from 'linaria/react'

type Props = {
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  children: ReactNode
}

export const FlexWrap = styled.div<Props>`
  display: flex;
  flex-wrap: ${p => p.wrap || 'nowrap'};
  justify-content: ${p => p.justifyContent || 'flex-start'};
  align-items: ${p => p.alignItems || 'center'};
`

export function Flex(props: Props) {
  const {children, ...rest} = props

  return <FlexWrap {...rest}>{children}</FlexWrap>
}
