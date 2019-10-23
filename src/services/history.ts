import { createHashHistory, createBrowserHistory } from 'history'

export const history = process.env.HISTORY_HASH
  ? createHashHistory()
  : createBrowserHistory()
