import {get, post} from '../axios/http.js'
import GLOBAL from '../common/global.js'

export const getTableList = (data) => post(`${GLOBAL.HOME}/table/list`, data)

export const getFirstTree = () => get(`${GLOBAL.HOME}/tree/first`)

export const getTreeList = (data) => post(`${GLOBAL.HOME}/tree/list`, data)

export const getTreeOnce = () => get(`${GLOBAL.HOME}/tree/once`)
