import IBaseBean from './base'

export interface IBlogTag extends IBaseBean {
  blogId?: string
  tagId?: string
  tagName: string
}
