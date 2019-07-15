import {styled} from 'linaria/react'

export const AuthLayoutWrapper = styled.div`
  display: flex;
`

export const Sidebar = styled.div`
  overflow: auto;
  height: 100vh;
`

export const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`

export const AppLoader = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
