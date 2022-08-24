import { deleteRequest, getRequest, IResponse, postRequest } from './request'
import IBaseBean from './base'
import { IBlogTag } from './blogTag'

const BASE_URL = '/blog'

export interface IPageableSearchBlogRequestParams {
  p_page: number
  p_size: number
  s_title?: string
  s_description?: string
  s_tag?: string
  s_param?: string
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

export interface IGetBlogByIdResponseData extends IResponse {
  data?: IBlog
}

export function getBlogById(id: string): Promise<IGetBlogByIdResponseData> {
  return getRequest(BASE_URL + `/${id}/getBlogById`)
}

export function saveBlog(blog: IBlog): Promise<IGetBlogByIdResponseData> {
  return postRequest(BASE_URL + '/saveBlog', blog)
}

export function deleteBlogById(id: string): Promise<IPageableSearchBlogResponseData> {
  return deleteRequest(BASE_URL + `/${id}/deleteBlogById`)
}
