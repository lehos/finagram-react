import React from 'react'
import {Icon} from 'antd'
import {styled} from 'linaria/react'

const SAppLoader = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export function AppLoader() {
  return (
    <SAppLoader>
      <Icon type="loading" style={{fontSize: 50}} />
      <br />
      <div>Loading your precious data...</div>
    </SAppLoader>
  )
}
