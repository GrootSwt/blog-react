import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPageable } from '../api/base'
import {
  getBlogById,
  IBlog,
  IGetBlogByIdResponseData,
  IPageableSearchBlogRequestParams,
  IPageableSearchBlogResponseData,
  pageableSearchBlog,
} from '../api/blog'

interface IState {
  blogList?: Array<IBlog>
  pageable?: IPageable
  blog?: IBlog
}

const initialState: IState = {}

export const pageableSearch = createAsyncThunk<
  IPageableSearchBlogResponseData,
  IPageableSearchBlogRequestParams
>('pageableSearchBlog', async (params) => {
  const res = await pageableSearchBlog(params)
  return res
})

export const getBlogDetail = createAsyncThunk<IGetBlogByIdResponseData, string>(
  'getBlogById',
  async (id) => {
    const res = await getBlogById(id)
    return res
  }
)

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(pageableSearch.fulfilled, (state, action) => {
      state.blogList = action.payload.data
      state.pageable = action.payload.pageable
    }),
      builder.addCase(getBlogDetail.fulfilled, (state, action) => {
        state.blog = action.payload.data
      })
  },
  reducers: {
    clearBlog: (state) => {
      delete state.blog
    },
  },
})

export default blogSlice.reducer
export const { clearBlog } = blogSlice.actions
