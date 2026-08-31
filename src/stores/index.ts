import { configureStore } from '@reduxjs/toolkit'
import commontReducer from './commentSlice'

export const store = configureStore({
  reducer: {
    commont: commontReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
