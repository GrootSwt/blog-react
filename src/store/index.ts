import { configureStore } from '@reduxjs/toolkit'
import blogSlice from '../feature/blogSlice'
const store = configureStore({
  reducer: {
    blog: blogSlice,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
