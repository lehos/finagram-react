import styled from '@emotion/styled'

export const Row = styled.div`
  margin-bottom: 20px;
`

export const Error = styled.div<{ absolute?: boolean }>`
  min-height: 16px;
  color: red;
  position: ${p => (p.absolute ? 'absolute' : 'static')};
`

export const Label = styled.div`
  margin-bottom: 8px;
`
