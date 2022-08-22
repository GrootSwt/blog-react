import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPageable } from '../api/base'
import {
  IBlog,
  IPageableSearchBlogRequestParams,
  IPageableSearchBlogResponseData,
  pageableSearchBlog,
} from '../api/blog'

interface IState {
  showDashboard: boolean
  blogList?: Array<IBlog>
  pageable?: IPageable
}

const initialState: IState = {
  showDashboard: true,
}

export const pageableSearch = createAsyncThunk<
  IPageableSearchBlogResponseData,
  IPageableSearchBlogRequestParams
>('pageableSearchBlog', async (params) => {
  const res = await pageableSearchBlog(params)
  return res
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(pageableSearch.fulfilled, (state, action) => {
      state.blogList = action.payload.data
      state.pageable = action.payload.pageable
    })
  },
  reducers: {
    switchshowDashboard: (state, action: PayloadAction<boolean>) => {
      state.showDashboard = action.payload
    },
  },
})

export const { switchshowDashboard } = homeSlice.actions
export default homeSlice.reducer
