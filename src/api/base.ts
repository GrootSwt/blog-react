interface IBaseBean {
  id: string
  createTime?: number
  lastUpdateTime?: number
}

export interface IPageable {
  page: number
  size: number
  total: number
}

export default IBaseBean
