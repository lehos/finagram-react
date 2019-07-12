import {styled} from 'linaria/react'

type Props = {
  width?: number
  height?: number
  inline?: boolean
}

export const Spacer = styled.div<Props>`
  display: ${p => p.inline ? 'inline-block' : 'block'};
  width: ${p => `${p.width || 0}px`};
  height: ${p => `${p.height || 0}px`};
`
