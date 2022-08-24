import IBaseBean from './base'
import { getRequest, IResponse } from './request'

const BASE_URL = '/tag'

export const colorList = ['#2F90B9', '#61649F', '#5E5314', '#144A74', '#248067']

export interface ITag extends IBaseBean {
  name: string
}

export interface IGetAllTagResponseData extends IResponse {
  data?: Array<ITag>
}

export function getAllTag (): Promise<IGetAllTagResponseData> {
  return getRequest(BASE_URL + '/getAllTag')
}
