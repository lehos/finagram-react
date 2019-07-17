import {createHashHistory} from 'history'

export const history = createHashHistory({
  basename: process.env.ASSET_PATH
})
