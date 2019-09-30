import { createHashHistory, createBrowserHistory } from 'history'

const options = { basename: process.env.ASSET_PATH }
export const history = process.env.HISTORY_HASH
  ? createHashHistory(options)
  : createBrowserHistory(options)
