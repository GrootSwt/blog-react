import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllTag, IGetAllTagResponseData, ITag } from '../api/tag'

interface IState {
  tagList?: Array<ITag>
}

const initialState: IState = {}

export const getTagList = createAsyncThunk<IGetAllTagResponseData>(
  'getAllTag',
  async () => {
    const res = await getAllTag()
    return res
  }
)

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTagList.fulfilled, (state, action) => {
      state.tagList = action.payload.data
    })
  },
  reducers: {},
})

export default tagSlice.reducer

