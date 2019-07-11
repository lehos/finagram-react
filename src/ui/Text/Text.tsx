import { styled } from 'linaria/react'

import * as T from './Text.types'

export const Text = styled.span<T.Props>`
  font-size: ${p => (p.size === 'l' ? '24px' : '16px')};
  line-height: ${p => (p.size === 'l' ? '30px' : '20px')};
`

Text.defaultProps = {
  size: 'm'
}
