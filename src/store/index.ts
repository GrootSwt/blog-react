import { configureStore } from '@reduxjs/toolkit';
import dashBoardReducer from '../feature/dashboardSlice'
const store = configureStore({
  reducer: {
    dashboard: dashBoardReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch