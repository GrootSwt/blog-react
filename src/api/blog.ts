import { getRequest, IResponse } from '../utils/request'
import IBaseBean from './base'
import { IBlogTag } from './blogTag'

const BASE_URL = '/blog'

export interface IPageableSearchBlogRequestParams {
  p_page: number
  p_size: number
  s_title?: string
  s_description?: string
  s_tag?: string
  s_content?: string
}

export interface IBlog extends IBaseBean {
  title: string
  description: string
  content: string
  blogTags: Array<IBlogTag>
}

export interface IPageableSearchBlogResponseData extends IResponse {
  data?: Array<IBlog>
}
export function pageableSearchBlog(
  params: IPageableSearchBlogRequestParams
): Promise<IPageableSearchBlogResponseData> {
  return getRequest(BASE_URL + '/pageableSearchBlog', params)
}
