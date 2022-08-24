import { configureStore } from '@reduxjs/toolkit'
import blogSlice from '../feature/blogSlice'
import tagSlice from '../feature/tagSlice'
const store = configureStore({
  reducer: {
    blog: blogSlice,
    tag: tagSlice
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
