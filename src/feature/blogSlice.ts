import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPageable } from '../api/base'
import {
  deleteBlogById,
  getBlogById,
  IBlog,
  IGetBlogByIdResponseData,
  IPageableSearchBlogRequestParams,
  IPageableSearchBlogResponseData,
  pageableSearchBlog,
  saveBlog,
} from '../api/blog'

interface IState {
  isPreview: boolean
  blogList?: Array<IBlog>
  pageable?: IPageable
  blog: IBlog
}

const blogInit = {
  title: '',
  description: '',
  content: '',
  blogTags: [],
}

const initialState: IState = {
  isPreview: true,
  blog: blogInit,
}

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

export const saveBlogDetail = createAsyncThunk<IGetBlogByIdResponseData, IBlog>(
  'saveBlog',
  async (blog: IBlog) => {
    const res = await saveBlog(blog)
    return res
  }
)

export const deleteBlog = createAsyncThunk<
  IPageableSearchBlogResponseData,
  string
>('deleteBlogById', async (id) => {
  const res = await deleteBlogById(id)
  return res
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(pageableSearch.fulfilled, (state, action) => {
      state.blogList = action.payload.data
      state.pageable = action.payload.pageable
    }),
      builder.addCase(getBlogDetail.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.blog = action.payload.data
        } else {
          state.blog = blogInit
        }
      }),
      builder.addCase(saveBlogDetail.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.blog = action.payload.data
        } else {
          state.blog = blogInit
        }
      }),
      builder.addCase(deleteBlog.fulfilled, (store, action) => {
        store.blogList = action.payload.data
        store.pageable = action.payload.pageable
      })
  },
  reducers: {
    clearBlog: (state) => {
      state.blog = blogInit
    },
    switchPreview: (store, action: PayloadAction<boolean>) => {
      store.isPreview = action.payload
    },
  },
})

export default blogSlice.reducer
export const { clearBlog, switchPreview } = blogSlice.actions
