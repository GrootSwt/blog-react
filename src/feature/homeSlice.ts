import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  showDashboard: boolean
}

const initialState: IState = {
  showDashboard: true
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    switchshowDashboard: (state, action: PayloadAction<boolean>) => {
      state.showDashboard = action.payload
    }
  }
})

export const { switchshowDashboard } = homeSlice.actions
export default homeSlice.reducer